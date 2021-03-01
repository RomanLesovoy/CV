declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.html' {
  interface ITemplate {
    [template: string]: string
  }
  const template: ITemplate;
  export = template;
}
