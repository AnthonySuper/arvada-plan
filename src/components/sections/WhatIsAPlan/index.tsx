import Cite from "@/components/footnotes/Cite";
import styles from './styles.module.css';

export default function WhatIsAPlan() {
  return (
    <section className={styles.whatis}>
      <header>
        <h2>So what&apos;s a comprehensive plan, anyway?</h2>
      </header>

      <p>
        When you&apos;re designing something as big as our city, it&apos;s important to have a vision.
        Arvada&apos;s comprehensive plans lay out that vision: how our city is going to manage
      </p>

      <ul>
        <li>Housing Development</li>
        <li>Commercial Development</li>
        <li>Transportation</li>
        <li>Parks, open spaces, trails, and other public recreation</li>
      </ul>

      <p>
        The last comprehensive plan was in 2014<Cite source="plan2014" />.
        Since then, a lot has changed...
      </p>
    </section>
  )
}
