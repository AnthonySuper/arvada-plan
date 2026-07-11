'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin, TextPlugin } from 'gsap/all';
import { GSDevTools } from 'gsap/GSDevTools';
import { useGSAP } from '@gsap/react';
import styles from './MissingMiddle.module.css';
import classes from './MissingMiddle2.module.css';
import HouseIcon from './house-icon.svg';
import DrawableQuestion from './split-drawable-question.svg';
import ApartmentIcon from './apartment-icon.svg';

// Register the ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, GSDevTools, DrawSVGPlugin, TextPlugin);
}

const PATHS = {
  house: "M12 3l10 9h-3v10H5V12H2l10-9z",
  building: "M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M7 21h10M7 21H3M17 21h4M10 7h4M10 11h4M10 15h4",
  question: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01",
  stamp: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  chart: "M3 3v18h18M21 9l-9 9-4-4-5 5",
  train: "M4 15c0 4.4 3.6 8 8 8s8-3.6 8-8v-8C20 4.2 18.2 2 12 2S4 4.2 4 7v8zM12 22v-4M8 22l-3-3M16 22l3-3M4 15h16M4 9h16",
  check: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"
};

const STORY_HEIGHT = 375;
const HOUSE_HEIGHT = STORY_HEIGHT * 2;
const APARTMENT_HEIGHT = STORY_HEIGHT * 3;

export default function NewMiddle() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    gsap.set('.house', { attr: { y: 3000 + HOUSE_HEIGHT, x: 1000 } });
    gsap.set('.apartment', { attr: { x: 1800, y: 3000 + APARTMENT_HEIGHT } });
    gsap.set('[data-paragraph]', { opacity: 0, y: -100 });
    gsap.set('[data-paragraph="1"]', { opacity: 1, y: 0 });
    gsap.set('[data-path-question]', { drawSVG: 0, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1
      },
      defaults: { ease: 'none' },
    });

    tl.to('[data-type="sfh"]', { text: 'a single family-home', duration: 1 }, '<')
      .to('.house', { attr: { y: 3000 - HOUSE_HEIGHT }, duration: 0.75 }, '<')
      .to('[data-type="apt"]', { text: 'or a mid-rise apartment', duraion: 1 })
      .to('.apartment', { attr: { y: 3000 - APARTMENT_HEIGHT }, duration: 0.75 }, '<')
      .to('[data-paragraph="1"]', { opacity: 0, y: 500, duration: 1 }, 'step-2')
      .to('[data-paragraph="2"]', { opacity: 1, y: 0, duration: 1 }, '<')
      .to('.house', { attr: { x: 0 }, duration: 1 }, '-=0.25')
      .to('.apartment', { attr: { x: 3000 }, duration: 1 }, '<')
      .to('[data-path-question]', { drawSVG: "100%", duration: 1 }, '<')
      .to('.house', { attr: { y: 0 - HOUSE_HEIGHT }, duration: 1 })
      .to('.apartment', { attr: { y: 0 - APARTMENT_HEIGHT }, duration: 1 }, '<');

    // GSDevTools.create({ animation: tl, id: "NewMiddle" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={classes.section}>
      <h2 className={classes.sectionHeader}>Allow Missing-Middle Housing Near Transit</h2>
      <div className={classes.sectionContent}>
        <svg viewBox="0 0 4000 3000" className={classes.sectionSvg}>

          <HouseIcon
            color="white"
            x={1000}
            y={3000 - HOUSE_HEIGHT}
            height={HOUSE_HEIGHT}
            preserveAspectRatio="xMinYMin meet"
            className="house" />
          <ApartmentIcon
            color="white"
            x={1800}
            y={3000 - APARTMENT_HEIGHT}
            height={APARTMENT_HEIGHT}
            preserveAspectRatio="xMinYMin meet"
            className="apartment"
          />
          <DrawableQuestion
            height={1500}
            x={1500}
            y={1000}
            opacity={1}
            preserveAspectRatio="xMinYMin meet"
          />
        </svg>
        <div className={classes.sectionExposition}>
          <p data-paragraph="1">
            In most of Arvada, you have two options for where to live:{' '}
            <span data-type="sfh" />{' '}
            <span data-type="apt" />
          </p>
          <p data-paragraph="2">
            But what if somebody wants something in the middle?
          </p>
        </div>
      </div>
    </div>
  );
}

export function MissingMiddle() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const paragraphs = gsap.utils.toArray<HTMLParagraphElement>('.animate-paragraph');

    // Initial SVG setup
    gsap.set('.svg-draw', { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });
    gsap.set('#house-duplex, #house-triplex', { opacity: 0, x: 0 });
    gsap.set('#house-adu', { opacity: 0, scale: 0, transformOrigin: "center bottom" });
    gsap.set('.cottage-house', { opacity: 0, scale: 0, transformOrigin: "center bottom" });
    gsap.set('.courtyard-green', { opacity: 0 });
    gsap.set('#question-mark', { opacity: 0, scale: 0, y: 20, transformOrigin: "center bottom" });
    gsap.set('#stamp', { opacity: 0, scale: 5, transformOrigin: "center center" });
    gsap.set('#chart', { opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set('#transit-scene', { opacity: 0, x: 500 });
    gsap.set('#checkmark', { opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set('.transit-house', { opacity: 0, scale: 0, transformOrigin: "center bottom" });

    if (paragraphs.length === 0) return;

    const tl = gsap.timeline({
      /* scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=800%',
        pin: true,
        scrub: 1,
      } */
    });

    paragraphs.forEach((p, index) => {
      // Fade in text
      tl.to(p, { opacity: 1, y: 0, duration: 1 }, `step${index}`);

      // Sync SVG Animations with text fade-in
      switch (index) {
        case 0: // "In most of Arvada..." (Draw home and midrise)
          tl.to('#house-base', { strokeDashoffset: 0, opacity: 1, duration: 1 }, `step${index}`);
          tl.to('#midrise', { strokeDashoffset: 0, opacity: 1, duration: 1 }, `step${index}`);
          break;
        case 1: // "But what if somebody wants something in the middle?" (Zoom house, fade midrise)
          tl.to('#camera-group', { scale: 2, x: 250, y: 150, duration: 1, ease: "power2.inOut" }, `step${index}`);
          tl.to('#midrise', { opacity: 0, duration: 1 }, `step${index}`);
          tl.to('#question-mark', { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }, `step${index}+=0.5`);
          break;
        case 2: // "Like a duplex or triplex?" (Home splits)
          tl.to('#question-mark', { opacity: 0, duration: 0.5 }, `step${index}`);
          tl.to('#camera-group', { scale: 1.4, x: 200, y: 50, duration: 1, ease: "power2.inOut" }, `step${index}`);
          tl.to('#house-base', { x: -80, duration: 1, ease: "power2.inOut" }, `step${index}`);
          tl.to('#house-duplex', { opacity: 1, x: 0, duration: 1, ease: "power2.inOut" }, `step${index}`);
          tl.to('#house-triplex', { opacity: 1, x: 80, duration: 1, ease: "power2.inOut" }, `step${index}+=0.2`);
          break;
        case 3: // "Or a mother-in-law house..." (ADU)
          tl.to(['#house-duplex', '#house-triplex'], { opacity: 0, x: -80, duration: 0.8, ease: "power2.inOut" }, `step${index}`);
          tl.to('#house-base', { x: 0, duration: 0.8, ease: "power2.inOut" }, `step${index}`);
          tl.to('#house-adu', { opacity: 1, scale: 0.5, x: 60, y: -20, duration: 0.8, ease: "back.out(1.5)" }, `step${index}+=0.4`);
          tl.to('#camera-group', { x: 250, duration: 0.8, ease: "power2.inOut" }, `step${index}`);
          break;
        case 4: // "Or a cottage court to retire in?" (Cottages)
          tl.to('#camera-group', { scale: 0.8, x: 500, y: 300, duration: 1, ease: "power2.inOut" }, `step${index}`);
          tl.to('#house-adu', { opacity: 0, duration: 0.5 }, `step${index}`);
          tl.to('#house-base', { x: -100, y: -100, scale: 0.6, duration: 1, ease: "power2.inOut" }, `step${index}`);
          tl.to('.cottage-house', { opacity: 1, scale: 0.6, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, `step${index}+=0.5`);
          tl.to('.courtyard-green', { opacity: 1, duration: 1 }, `step${index}+=0.8`);
          break;
        case 5: // "Even in our existing mixed-use..." (Red tape)
          tl.to('#camera-group', { scale: 1.2, x: 300, y: 200, duration: 1, ease: "power2.inOut" }, `step${index}`);
          tl.to(['#house-base', '.cottage-house', '.courtyard-green'], { stroke: "#666", opacity: 0.5, duration: 1 }, `step${index}`);
          tl.to('#stamp', { opacity: 1, scale: 1, duration: 0.8, ease: "bounce.out" }, `step${index}+=0.2`);
          break;
        case 6: // "All this red tape makes housing more expensive..." (Prices up)
          tl.to('#stamp', { opacity: 0, scale: 2, duration: 0.5 }, `step${index}`);
          tl.to(['#house-base', '.cottage-house', '.courtyard-green'], { scale: 0.4, opacity: 0.2, duration: 1 }, `step${index}`);
          tl.to('#chart', { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power1.inOut" }, `step${index}`);
          break;
        case 7: // "We want to simplify the approval process..." (Transit)
          tl.to('#camera-group', { x: -300, duration: 1.5, ease: "power2.inOut" }, `step${index}`);
          tl.to('#transit-scene', { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }, `step${index}`);
          tl.to('.transit-house', { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, `step${index}+=0.8`);
          tl.to('#checkmark', { strokeDashoffset: 0, opacity: 1, duration: 1 }, `step${index}+=1.2`);
          break;
      }

      // Fade out text (except last one)
      if (index < paragraphs.length - 1) {
        tl.to(p, { opacity: 0, y: -20, duration: 1 }, `step${index}+=2.5`);
      }
    });

    GSDevTools.create({ animation: tl, id: "MissingMiddle" });
  }, { scope: containerRef });

  const textBlocks = [
    "In most of Arvada, you have two options for where to live: a detached single-family home, or a midrise apartment.",
    "But what if somebody wants something in the middle?",
    "Like a duplex or triplex?",
    "Or a mother-in-law house, instead of a nursing home?",
    "Or a cottage court to retire in?",
    "Even in our existing mixed-use and near-transit zones, these types of housing require multiple hearings and a special-use permit.",
    "All this red tape makes housing more expensive for Arvadans, especially those who are just getting on the property ladder.",
    "We want to simplify the approval process so these types of housing can be built by right near transit, to give Arvadans more choice, and help first-time homebuyers."
  ];

  return (
    <section id="missing-middle-container" ref={containerRef} className={styles.container}>
      <h2 className={styles.header}>
        Allow Missing-Middle Homes Near Transit
      </h2>

      <div className={styles.content}>
        <div className={styles.graphicsColumn}>
          <svg viewBox="0 0 1000 1000" className={styles.svgCanvas}>
            <g id="camera-group" stroke="var(--foreground)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0, 0) scale(1)">

              {/* Main Scene */}
              <g id="scene-main">
                {/* Midrise */}
                <g transform="translate(650, 400) scale(12)" id="midrise" className="svg-draw">
                  <path d={PATHS.building} />
                </g>

                {/* Question Mark */}
                <g transform="translate(250, 300) scale(8)" id="question-mark">
                  <path d={PATHS.question} />
                </g>

                {/* Stamp */}
                <g transform="translate(350, 450) scale(12)" id="stamp" stroke="#ef4444" strokeWidth="2">
                  <path d={PATHS.stamp} />
                </g>

                {/* Chart */}
                <g transform="translate(350, 400) scale(12)" id="chart" stroke="#ef4444" className="svg-draw" strokeWidth="2">
                  <path d={PATHS.chart} />
                </g>

                {/* Houses */}
                <g id="houses" transform="translate(250, 450)">
                  <g id="house-base" transform="scale(8)" className="svg-draw">
                    <path d={PATHS.house} />
                  </g>
                  <g id="house-duplex" transform="scale(8)" className="svg-draw">
                    <path d={PATHS.house} />
                  </g>
                  <g id="house-triplex" transform="scale(8)" className="svg-draw">
                    <path d={PATHS.house} />
                  </g>
                  <g id="house-adu" transform="scale(8)" className="svg-draw">
                    <path d={PATHS.house} />
                  </g>

                  {/* Cottage Court Additions */}
                  <g className="cottage-house" transform="translate(100, -100) scale(4.8)">
                    <path d={PATHS.house} className="svg-draw" style={{ strokeDashoffset: 0, opacity: 1 }} />
                  </g>
                  <g className="cottage-house" transform="translate(150, 50) scale(4.8)">
                    <path d={PATHS.house} className="svg-draw" style={{ strokeDashoffset: 0, opacity: 1 }} />
                  </g>
                  <g className="cottage-house" transform="translate(0, 150) scale(4.8)">
                    <path d={PATHS.house} className="svg-draw" style={{ strokeDashoffset: 0, opacity: 1 }} />
                  </g>
                  <g className="cottage-house" transform="translate(-150, 50) scale(4.8)">
                    <path d={PATHS.house} className="svg-draw" style={{ strokeDashoffset: 0, opacity: 1 }} />
                  </g>

                  {/* Courtyard Greens */}
                  <circle cx="20" cy="20" r="160" className="courtyard-green" stroke="#22c55e" strokeWidth="1" strokeDasharray="10 10" />
                  <path d="M-80 20 Q 20 80 120 20" className="courtyard-green" stroke="#22c55e" strokeWidth="2" />
                </g>
              </g>

              {/* Transit Scene */}
              <g id="transit-scene" transform="translate(1100, 450)">
                <g transform="translate(-150, 0) scale(10)" stroke="#3b82f6">
                  <path d={PATHS.train} />
                </g>
                <g className="transit-house" transform="translate(50, 50) scale(6)">
                  <path d={PATHS.house} />
                </g>
                <g className="transit-house" transform="translate(150, 0) scale(7)">
                  <path d={PATHS.building} />
                </g>
                <g className="transit-house" transform="translate(250, 50) scale(6)">
                  <path d={PATHS.house} />
                </g>
                <g id="checkmark" transform="translate(100, -100) scale(10)" stroke="#22c55e" className="svg-draw">
                  <path d={PATHS.check} />
                </g>
              </g>

            </g>
          </svg>
        </div>

        <div className={styles.textColumn}>
          {textBlocks.map((text, idx) => (
            <p key={idx} className={`animate-paragraph ${styles.paragraph}`}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
