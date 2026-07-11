import { type ReactNode } from 'react';

export interface Props {
  title: string;
  children: ReactNode;
}

export default function CardSection({ title, children }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
