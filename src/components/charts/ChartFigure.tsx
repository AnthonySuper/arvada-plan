import type { ReactNode } from "react";
import styles from "./charts.module.css";

export interface DataTableProps {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}

/**
 * Wraps a chart in a <figure> with a caption, and (optionally) a collapsible
 * table of the underlying numbers for anyone who can't or doesn't want to read
 * the graphic.
 */
export default function ChartFigure({
  caption,
  table,
  children,
}: {
  caption: ReactNode;
  table?: DataTableProps;
  children: ReactNode;
}) {
  return (
    <figure className={styles.figure}>
      {children}
      <figcaption className={styles.caption}>{caption}</figcaption>
      {table && (
        <details className={styles.dataTable}>
          <summary>Show the numbers</summary>
          <table>
            <caption className="visually-hidden">{table.caption}</caption>
            <thead>
              <tr>
                {table.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map(([first, ...rest]) => (
                <tr key={first}>
                  <th scope="row">{first}</th>
                  {rest.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </figure>
  );
}
