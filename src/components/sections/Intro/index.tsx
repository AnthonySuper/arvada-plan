import styles from './styles.module.css';

export default function Intro() {

  return (
    <div className={styles.container}>
      <header className={styles.content}>
        <h1>Arvada is planning for the next decade</h1>

        <p>
          In 2026, the city of Arvada is writing a new <em>comprehensive plan</em>, a document
          that helps the city decide what should get built and where.
          This is a big opportunity for the city to correct past mistakes, innovate for the future,
          and ensure that the next decade is Arvada&apos;s best ever.
        </p>

        <p>
          At <a href="https://yimbyarvada.org">YIMBY Arvada</a>,
          we&apos;ve come up with a few suggestions to make sure this comprehensive plan is as good as it can be.
        </p>
      </header>
    </div>
  );
}
