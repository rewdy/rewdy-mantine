import { Box, createPolymorphicComponent, type BoxProps } from "@mantine/core";
import { forwardRef, type ReactNode } from "react";
import classes from "./Prose.module.css";

export interface ProseProps extends BoxProps {
  /** Drop the 62ch measure cap and fill the container. */
  full?: boolean;
  children?: ReactNode;
}

/**
 * Opt-in editorial type scale (21px / 1.65, capped at 62ch).
 *
 * Wrap hero and content copy in this. Everything outside it stays on the 18px
 * app scale, which is what keeps tables and forms usable.
 */
const ProseBase = forwardRef<HTMLDivElement, ProseProps & { component?: any }>(
  ({ full, component = "div", className, children, ...others }, ref) => {
    const cx = [classes.root, full && classes.full, className].filter(Boolean).join(" ");

    return (
      <Box component={component} ref={ref} className={cx} {...others}>
        {children}
      </Box>
    );
  },
);

ProseBase.displayName = "Prose";

export const Prose = createPolymorphicComponent<"div", ProseProps>(ProseBase);
