import { MantineProvider, type MantineProviderProps } from "@mantine/core";
import { rewdyCssVariablesResolver, rewdyTheme } from "../theme";

export type RewdyProviderProps = MantineProviderProps;

/**
 * MantineProvider preconfigured with the rewdy theme and the CSS variables
 * resolver that emits the band/texture variables. Both are overridable.
 */
export function RewdyProvider({
  theme,
  cssVariablesResolver,
  children,
  ...rest
}: RewdyProviderProps) {
  return (
    <MantineProvider
      theme={theme ?? rewdyTheme}
      cssVariablesResolver={cssVariablesResolver ?? rewdyCssVariablesResolver}
      {...rest}
    >
      {children}
    </MantineProvider>
  );
}
