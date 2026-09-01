import { ReactNode } from "react";
import styles from "./styles.module.css";

function ChangeSection({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className={styles.changeSection}>
      <dt className={styles.changeCaption}>{caption}</dt>
      <dd className={styles.changeBody}>{children}</dd>
    </div>
  );
}

export default function ChangingArvada() {
  return (
    <dl className={styles.changeArea}>
      <ChangeSection caption="Bigger">
        <p>
          In 2014, Arvada had 113,116 residents.
          Today, it has 122,391.
          That&apos;s nearly ten thousand new people.
        </p>
      </ChangeSection>
      <ChangeSection caption="Older">
        <p>
          Arvada is older!
          A more specific number will follow soon I promise!
        </p>
      </ChangeSection>
      <ChangeSection caption="More Expensive">
        <p>
          Arvada got more expensive, yo!
        </p>
      </ChangeSection>
    </dl>
  )
}
