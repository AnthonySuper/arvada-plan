'use client';
import { useRef } from 'react';

export default function MissingMiddle() {
  const containerRef = useRef<HTMLElement | null>(null);
  return (
    <section id="missing-middle-container" ref={containerRef}>
      {/* STICKY header, should always display at the top */}
      <h2>Allow Missing-Middle Homes Near Transit</h2>
      {/* For a first draft, can we just have all of these fade to each other? We can add illustrations later! */}
      <p>
        In most of Arvada, you have two options for where to live: a detached single-family home, or a midrise apartment.
      </p>
      <p>
        But what if somebody wants something in the middle?
      </p>
      <p>
        Like a duplex or triplex?
      </p>
      <p>
        Or a mother-in-law house, instead of a nursing home?
      </p>
      <p>
        Or a cottage court to retire in?
      </p>
      <p>
        Even in our existing mixed-use and near-transit zones, these types of housing require muliple hearings and a special-use permit.
      </p>
      <p>
        All this red tape makes housing more expensive for Arvadans, especially those who are just getting on the property ladder.
      </p>
      <p>
        We want to simplify the approval process so these types of housing can be built <em>by right</em> near transit, to give Arvadans more choice, and help first-time homebuyers.
      </p>
    </section>
  )
}
