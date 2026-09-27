/**
 * CSS module declarations. The example app gets these from `vite/client`, but the
 * library typechecks standalone and has no Vite dependency.
 */
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
