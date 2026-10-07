import type { ReactNode } from "react";
import styles from "./Todo.module.css";

/**
 * A note for the authors: something to research, verify, or decide.
 * Shows up as a yellow box in `npm run dev` and renders nothing in production builds.
 */
export default function Todo({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <aside className={styles.todo}>
      <strong>TODO:</strong> {children}
    </aside>
  );
}
