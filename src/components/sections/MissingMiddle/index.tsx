'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function MissingMiddle() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    // Select all paragraphs with the animate-paragraph class, scoped automatically to containerRef
    const paragraphs = gsap.utils.toArray<HTMLParagraphElement>('.animate-paragraph');
    if (paragraphs.length === 0) return;

    // Create a GSAP timeline linked to the scroll position of the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',      // Pin when the top of the section reaches the top of the viewport
        end: '+=350%',         // Scroll length is 3.5x viewport height
        pin: true,             // Pin the section in place
        scrub: 1,              // Smoothly scrub the animation with a 1s delay
      }
    });

    // Animate each paragraph sequentially
    paragraphs.forEach((p, index) => {
      // Fade in and move up slightly
      tl.to(p, {
        opacity: 1,
        y: 0,
        duration: 1,
      });

      // Unless it is the last paragraph, fade it out to 15% opacity before showing the next one
      if (index < paragraphs.length - 1) {
        tl.to(p, {
          opacity: 0.00,
          y: -20,
          duration: 1,
        }, '+=0.5'); // Small delay before starting the fade-out
      }
    });

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
    <section
      id="missing-middle-container"
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: "var(--background)",
        padding: "2rem"
      }}
    >
      {/* STICKY header, should always display at the top of the pinned viewport */}
      <h2 style={{
        position: "absolute",
        top: "4rem",
        fontSize: "2rem",
        fontWeight: "800",
        textAlign: "center",
        color: "var(--foreground)",
        width: "100%",
        maxWidth: "800px",
        padding: "0 1rem"
      }}>
        Allow Missing-Middle Homes Near Transit
      </h2>

      {/* Paragraphs container */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "650px",
        minHeight: "250px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {textBlocks.map((text, idx) => (
          <p
            key={idx}
            className="animate-paragraph"
            style={{
              position: "absolute",
              opacity: 0,
              transform: "translateY(30px)",
              fontSize: "1.25rem",
              lineHeight: "1.6",
              textAlign: "center",
              fontWeight: "500",
              color: "var(--foreground)",
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
