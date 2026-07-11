"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin, TextPlugin } from "gsap/all";
import { GSDevTools } from "gsap/GSDevTools";
import { useGSAP } from "@gsap/react";
import classes from "./MissingMiddle.module.css";
import HouseIcon from "./house-icon.svg";
import DrawableQuestion from "./split-drawable-question.svg";
import ApartmentIcon from "./apartment-icon.svg";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, GSDevTools, DrawSVGPlugin, TextPlugin);
}

const STORY_HEIGHT = 375;
const HOUSE_HEIGHT = STORY_HEIGHT * 2;
const APARTMENT_HEIGHT = STORY_HEIGHT * 3;

export default function NewMiddle() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".house", { attr: { y: 3000 + HOUSE_HEIGHT, x: 1000 } });
      gsap.set(".apartment", { attr: { x: 1800, y: 3000 + APARTMENT_HEIGHT } });
      gsap.set("[data-paragraph]", { opacity: 0, y: -100 });
      gsap.set('[data-paragraph="1"]', { opacity: 1, y: 0 });
      gsap.set("[data-path-question]", { drawSVG: 0, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
        },
        defaults: { ease: "none" },
      });

      tl.to('[data-type="sfh"]', { text: "a single family-home", duration: 1 }, "<")
        .to(".house", { attr: { y: 3000 - HOUSE_HEIGHT }, duration: 0.75 }, "<")
        .to('[data-type="apt"]', { text: "or a mid-rise apartment", duraion: 1 })
        .to(".apartment", { attr: { y: 3000 - APARTMENT_HEIGHT }, duration: 0.75 }, "<")
        .to('[data-paragraph="1"]', { opacity: 0, y: 500, duration: 1 }, "step-2")
        .to('[data-paragraph="2"]', { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".house", { attr: { x: 0 }, duration: 1 }, "-=0.25")
        .to(".apartment", { attr: { x: 3000 }, duration: 1 }, "<")
        .to("[data-path-question]", { drawSVG: "100%", duration: 1 }, "<")
        .to(".house", { attr: { y: 0 - HOUSE_HEIGHT }, duration: 1 })
        .to(".apartment", { attr: { y: 0 - APARTMENT_HEIGHT }, duration: 1 }, "<");

      // GSDevTools.create({ animation: tl, id: "NewMiddle" });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={classes.section}>
      <h2 className={classes.sectionHeader}>Allow Missing-Middle Housing Near Transit</h2>
      <div className={classes.sectionContent}>
        <svg viewBox="0 0 4000 3000" className={classes.sectionSvg}>
          <HouseIcon
            color="inherit"
            x={1000}
            y={3000 - HOUSE_HEIGHT}
            height={HOUSE_HEIGHT}
            preserveAspectRatio="xMinYMin meet"
            className="house"
          />
          <ApartmentIcon
            color="inherit"
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
            In most of Arvada, you have two options for where to live: <span data-type="sfh" />{" "}
            <span data-type="apt" />
          </p>
          <p data-paragraph="2">But what if somebody wants something in the middle?</p>
        </div>
      </div>
    </div>
  );
}
