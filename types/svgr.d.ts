type SvgrComponent = React.ComponentType<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
  const ReactComponent: SvgrComponent;

  export { ReactComponent };
}
