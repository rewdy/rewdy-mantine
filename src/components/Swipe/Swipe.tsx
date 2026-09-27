import type { ComponentPropsWithoutRef, ReactNode } from "react";
import classes from "./Swipe.module.css";

export interface SwipeProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

/**
 * A flat, translucent wash behind a run of type — a highlighter stroke for a
 * phrase inside a display heading, not a component in its own right.
 *
 * The wash is mixed from Mantine's per-scheme violet accent, so it needs no
 * custom variable and re-tints in dark mode on its own. Deliberately unskewed
 * and unoffset: the system stays flat, and a rotated block would tip it toward
 * skeuomorphism.
 */
export function Swipe({ className, children, ...others }: SwipeProps) {
  const cx = [classes.root, className].filter(Boolean).join(" ");

  return (
    <span className={cx} {...others}>
      {children}
    </span>
  );
}
