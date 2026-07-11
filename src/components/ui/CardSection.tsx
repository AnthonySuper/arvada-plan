import { type ReactNode, type CSSProperties } from 'react';
import styles from './CardSection.module.css';

export interface Props {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
}

export default function CardSection({ title, children, style }: Props) {
  return (
    <section className={styles.card} style={style}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}
