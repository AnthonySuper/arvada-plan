#!/usr/bin/env node
/**
 * Downloads Census Bureau data for Arvada and writes it to src/data/census.json.
 *
 * The site build does NOT run this script. Run it by hand (`npm run data:census`)
 * when you want to refresh the numbers, then review the diff before committing.
 *
 * Everything comes from the Census Bureau's bulk download server (www2.census.gov),
 * which unlike api.census.gov does not require an API key:
 *
 *   - Population estimates (PEP): 2010-2019 intercensal, 2020+ latest vintage.
 *   - American Community Survey 1-year estimates for a handful of housing tables.
 *     2014-2019 come from the old "sequence-based" summary files; 2021+ come from
 *     the "table-based" summary files. There is no standard 2020 1-year release.
 *
 * Downloads are cached in .cache/census so re-runs are fast.
 */
import { execFile } from "node:child_process";
import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(ROOT, ".cache", "census");
const OUT = path.join(ROOT, "src", "data", "census.json");

const STATE_FIPS = "08";
const STATE_ABBR = "co";
const STATE_NAME = "Colorado";
const PLACE_FIPS = "03455"; // Arvada city
const GEOID = `${STATE_FIPS}${PLACE_FIPS}`;

/** Latest population-estimates vintage to try first; falls back a year at a time. */
const PEP_LATEST_VINTAGE = new Date().getFullYear();
/** ACS 1-year years to pull. 2020 is skipped because the Census Bureau didn't publish it. */
const ACS_FIRST_YEAR = 2014;

/**
 * ACS tables we want, and which cells of each to keep.
 * Keys become property names in the output JSON.
 */
const ACS_TABLES = {
  population: { table: "B01003", cell: 1 },
  medianGrossRent: { table: "B25064", cell: 1 },
  medianHomeValue: { table: "B25077", cell: 1 },
  lowerQuartileHomeValue: { table: "B25076", cell: 1 },
  upperQuartileHomeValue: { table: "B25078", cell: 1 },
  averageHouseholdSize: { table: "B25010", cell: 1 },
  medianHouseholdIncome: { table: "B19013", cell: 1 },
};

const WWW2 = "https://www2.census.gov/programs-surveys";

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

/** Reads a Census text file. They're Latin-1, not UTF-8. */
const readText = (file) => readFile(file, "latin1");

async function download(url, file) {
  const dest = path.join(CACHE, file);
  if (await exists(dest)) return dest;
  console.log(`  downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  return dest;
}

async function tryDownload(url, file) {
  try {
    return await download(url, file);
  } catch {
    return null;
  }
}

/** Minimal CSV line splitter that understands double-quoted fields. */
function splitCsv(line) {
  const out = [];
  let cur = "";
  let quoted = false;
  for (const ch of line) {
    if (ch === '"') quoted = !quoted;
    else if (ch === "," && !quoted) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

async function readCsv(file) {
  const [header, ...rows] = (await readText(file)).trim().split(/\r?\n/).map(splitCsv);
  return rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

// ---------------------------------------------------------------------------
// Population estimates
// ---------------------------------------------------------------------------

async function fetchPopulation() {
  console.log("Population estimates");
  const series = [];

  const intercensal = await download(
    `${WWW2}/popest/datasets/2010-2020/intercensal/cities/sub-est2020int.csv`,
    "pep/sub-est2020int.csv",
  );
  const icRow = (await readCsv(intercensal)).find(
    (r) => r.SUMLEV === "162" && r.STATE === STATE_FIPS && r.PLACE === PLACE_FIPS,
  );
  for (let year = 2010; year <= 2019; year++) {
    series.push({ year, population: Number(icRow[`POPESTIMATE${year}`]), series: "intercensal" });
  }

  let vintage = PEP_LATEST_VINTAGE;
  let file = null;
  for (; vintage >= 2021 && !file; vintage--) {
    file = await tryDownload(
      `${WWW2}/popest/datasets/2020-${vintage}/cities/totals/sub-est${vintage}_${Number(STATE_FIPS)}.csv`,
      `pep/sub-est${vintage}_${Number(STATE_FIPS)}.csv`,
    );
  }
  vintage++;
  if (!file) throw new Error("Could not find a post-2020 population estimates vintage");

  const row = (await readCsv(file)).find(
    (r) => r.SUMLEV === "162" && r.STATE === STATE_FIPS && r.PLACE === PLACE_FIPS,
  );
  for (let year = 2020; year <= vintage; year++) {
    series.push({
      year,
      population: Number(row[`POPESTIMATE${year}`]),
      series: `vintage${vintage}`,
    });
  }

  return {
    census2010: Number(icRow.ESTIMATESBASE2010),
    census2020: Number(icRow.CENSUS2020POP),
    vintage,
    series,
  };
}

// ---------------------------------------------------------------------------
// ACS 1-year, sequence-based summary files (2014-2019)
// ---------------------------------------------------------------------------

async function fetchAcsSequenceYear(year) {
  const base = `${WWW2}/acs/summary_file/${year}`;
  const zip = await download(
    `${base}/data/1_year_by_state/${STATE_NAME}_All_Geographies.zip`,
    `acs/${year}/${STATE_NAME}_All_Geographies.zip`,
  );
  const lookupFile = await download(
    `${base}/documentation/user_tools/ACS_1yr_Seq_Table_Number_Lookup.txt`,
    `acs/${year}/lookup.txt`,
  );

  const dir = path.join(CACHE, "acs", String(year), "unzipped");
  if (!(await exists(dir))) {
    await mkdir(dir, { recursive: true });
    await execFileAsync("unzip", ["-oq", zip, "-d", dir]);
  }

  // Find Arvada's logical record number in the geography file.
  const geoFile = (await readdir(dir)).find((f) => /^g\d+1\w\w\.csv$/i.test(f));
  const geoLine = (await readText(path.join(dir, geoFile)))
    .split(/\r?\n/)
    .map(splitCsv)
    .find((r) => r.includes(`16000US${GEOID}`));
  const logrecno = geoLine[4];

  // Lookup rows with a start position tell us where a table begins in its sequence file.
  const lookup = (await readText(lookupFile)).split(/\r?\n/).map(splitCsv);
  const result = {};
  for (const [key, { table, cell }] of Object.entries(ACS_TABLES)) {
    const def = lookup.find((r) => r[1] === table && r[4]?.trim());
    if (!def) continue;
    const seq = String(def[2]).padStart(4, "0");
    const start = Number(def[4]);
    const read = async (prefix) => {
      const f = path.join(dir, `${prefix}${year}1${STATE_ABBR}${seq}000.txt`);
      const row = (await readText(f))
        .split(/\r?\n/)
        .map(splitCsv)
        .find((r) => r[5] === logrecno);
      return Number(row[start - 1 + cell - 1]);
    };
    result[key] = { estimate: await read("e"), moe: await read("m") };
  }
  return result;
}

// ---------------------------------------------------------------------------
// ACS 1-year, table-based summary files (2021+)
// ---------------------------------------------------------------------------

async function fetchAcsTableYear(year) {
  const result = {};
  for (const [key, { table, cell }] of Object.entries(ACS_TABLES)) {
    const name = `acsdt1y${year}-${table.toLowerCase()}.dat`;
    const file = await tryDownload(
      `${WWW2}/acs/summary_file/${year}/table-based-SF/data/1YRData/${name}`,
      `acs/${year}/${name}`,
    );
    if (!file) return null; // Year not released yet.
    const lines = (await readText(file)).trim().split(/\r?\n/);
    const header = lines[0].split("|");
    const row = lines.find((l) => l.startsWith(`1600000US${GEOID}|`)).split("|");
    const cellId = String(cell).padStart(3, "0");
    result[key] = {
      estimate: Number(row[header.indexOf(`${table}_E${cellId}`)]),
      moe: Number(row[header.indexOf(`${table}_M${cellId}`)]),
    };
  }
  return result;
}

async function fetchAcs() {
  console.log("American Community Survey (1-year)");
  const years = [];
  for (let year = ACS_FIRST_YEAR; ; year++) {
    if (year === 2020) continue;
    console.log(` ${year}`);
    const data = year < 2020 ? await fetchAcsSequenceYear(year) : await fetchAcsTableYear(year);
    if (!data) break;
    years.push({ year, ...data });
  }
  return years;
}

// ---------------------------------------------------------------------------

const output = {
  _comment:
    "Generated by scripts/fetch-census-data.mjs. Do not edit by hand; re-run `npm run data:census`.",
  geography: { name: "Arvada city, Colorado", geoid: GEOID },
  population: await fetchPopulation(),
  acs1: await fetchAcs(),
};

await writeFile(OUT, JSON.stringify(output, null, 2) + "\n");
console.log(`Wrote ${path.relative(ROOT, OUT)}`);
