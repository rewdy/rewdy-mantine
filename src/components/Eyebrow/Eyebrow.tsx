import { Text, type TextProps } from "@mantine/core";
import type { ReactNode } from "react";

export interface EyebrowProps extends TextProps {
  children?: ReactNode;
}

/**
 * The small caps-tracked kicker that sits above section headings. Used often
 * enough across the system to be worth a component instead of repeated props.
 */
export function Eyebrow({ c = "primary", style, children, ...others }: EyebrowProps) {
  // Array form, so a caller's `style` layers on top of the tracking instead of
  // replacing it — a plain spread after `style` drops it silently.
  const base = { letterSpacing: "var(--rwd-eyebrow-tracking)", margin: 0 };

  return (
    <Text c={c} fz="xs" fw={700} tt="uppercase" style={style ? [base, style] : base} {...others}>
      {children}
    </Text>
  );
}
