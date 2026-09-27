import {
  Box,
  Container,
  createPolymorphicComponent,
  type BoxProps,
  type ContainerProps,
} from "@mantine/core";
import { forwardRef, type ReactNode } from "react";
import classes from "./Band.module.css";

export type BandVariant = "base" | "tint" | "muted" | "deep";
export type BandTexture = "none" | "wave" | "dots" | "hatch";
export type BandPad = "xs" | "sm" | "md" | "lg";

export interface BandProps extends BoxProps {
  /** Surface tint. Page rhythm comes from alternating these. */
  variant?: BandVariant;
  /** Tiling motif laid over the surface tint. */
  texture?: BandTexture;
  /** Vertical padding. */
  pad?: BandPad;
  /**
   * Max content width. `false` renders children edge-to-edge with no Container,
   * for bands that manage their own layout.
   */
  size?: ContainerProps["size"] | false;
  children?: ReactNode;
}

const padClass: Record<BandPad, string> = {
  xs: classes.padXs,
  sm: classes.padSm,
  md: classes.padMd,
  lg: classes.padLg,
};

const textureClass: Record<BandTexture, string | undefined> = {
  none: undefined,
  wave: classes.wave,
  dots: classes.dots,
  hatch: classes.hatch,
};

/**
 * A full-bleed horizontal section — the signature of the system.
 *
 * Page structure is expressed by stacking Bands of differing tint and texture
 * rather than by floating cards on a single background. Mantine has no
 * equivalent primitive, which is why this is a real component and not theme
 * config.
 */
const BandBase = forwardRef<HTMLDivElement, BandProps & { component?: any }>(
  (
    {
      variant = "base",
      texture = "none",
      pad = "md",
      size = "lg",
      component = "section",
      className,
      children,
      ...others
    },
    ref,
  ) => {
    const cx = [classes.root, classes[variant], textureClass[texture], padClass[pad], className]
      .filter(Boolean)
      .join(" ");

    return (
      <Box
        component={component}
        ref={ref}
        className={cx}
        // The inverted band is a dark-scheme island: Mantine keys its component
        // CSS off this attribute as an ancestor, so nested surfaces get their
        // dark treatment instead of painting themselves white. See Band.module.css.
        data-mantine-color-scheme={variant === "deep" ? "dark" : undefined}
        {...others}
      >
        {size === false ? children : <Container size={size}>{children}</Container>}
      </Box>
    );
  },
);

BandBase.displayName = "Band";

export const Band = createPolymorphicComponent<"section", BandProps>(BandBase);
