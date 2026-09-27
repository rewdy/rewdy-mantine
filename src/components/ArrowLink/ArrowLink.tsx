import { Anchor, type AnchorProps } from "@mantine/core";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import classes from "./ArrowLink.module.css";

/**
 * `AnchorProps` alone omits the intrinsic anchor attributes (`href`, `target`,
 * …) — Mantine adds those through its polymorphic wrapper, which a plain
 * function component can't reproduce. Merging the `<a>` props back in keeps
 * `href` typed; `color` and `style` are taken from the Mantine side, since the
 * intrinsic versions of those two collide with Mantine's own prop types.
 */
export type ArrowLinkProps = AnchorProps &
  Omit<ComponentPropsWithoutRef<"a">, "color" | "style"> & {
    children?: ReactNode;
    /** Polymorphic passthrough, so an internal router link can be used. */
    component?: any;
  };

/**
 * A link or CTA with a trailing arrow that nudges right on hover.
 *
 * The nudge is the same physicality language as the button press — a few pixels
 * of movement in the affordance rather than elevation or a color shift. It's
 * opt-in rather than applied to every `Anchor`, because an arrow on inline prose
 * links would read as noise; this is for standalone links and CTAs.
 */
export function ArrowLink({ className, children, ...others }: ArrowLinkProps) {
  const cx = [classes.root, className].filter(Boolean).join(" ");

  return (
    <Anchor className={cx} {...others}>
      {children}
      {/* Decorative — the arrow carries no meaning the label doesn't. */}
      <span aria-hidden className={classes.arrow}>
        →
      </span>
    </Anchor>
  );
}
