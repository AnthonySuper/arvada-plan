import GLine from "./GLine";
import HomePrices from "./HomePrices";
import HouseholdSize from "./HouseholdSize";
import OldeTown from "./OldeTown";
import Population from "./Population";
import Rent from "./Rent";
import styles from "./styles.module.css";

/**
 * "Arvada has changed": what got better since the 2014 plan, what got worse,
 * and a closing line that sets up the recommendations.
 */
export default function ArvadaHasChanged() {
  return (
    <>
      <section aria-labelledby="changed-heading">
        <header className={styles.sectionHeader}>
          <h2 id="changed-heading">Arvada has changed</h2>
        </header>
        <div className={styles.stories}>
          <GLine />
          <OldeTown />
          <Population />
        </div>
      </section>

      <section aria-labelledby="not-well-heading" className={styles.badNews}>
        <header className={styles.sectionHeader}>
          <h2 id="not-well-heading">But not everything went so well</h2>
        </header>
        <div className={styles.stories}>
          <Rent />
          <HomePrices />
          <HouseholdSize />
        </div>
      </section>

      <section className={styles.finale} aria-label="Summary">
        <p>Arvada got better.</p>
        <p>
          But it lost something along the way: <strong>affordability</strong>.
        </p>
        <p>Thankfully, we can use Arvada&apos;s strengths to fix the issue.</p>
      </section>
    </>
  );
}
