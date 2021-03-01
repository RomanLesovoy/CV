export enum ShadowMods {
  Open = 'open',
  Closed = 'closed'
}

/**
 * Parse file with html
 *
 * @param template
 * @returns {Document}
 */
function parseHtml(template: any) {
  return new DOMParser().parseFromString( template, 'text/html' );
}

interface BindTemplateProps {
  object: any,
  template: any,
  selector: string,
  mode?: ShadowMods,
}

/**
 * Bind template to component
 * @param object
 * @param template
 * @param selector
 * @param mode
 * @param css
 */
export function bindTemplate({ object, template, selector, mode = ShadowMods.Open, }: BindTemplateProps): HTMLBodyElement {
  const shadow = object.attachShadow ({ mode });
  const sample: any = parseHtml(template).querySelector(selector);
  shadow.appendChild(sample.content);
  return shadow;
}

interface ExecuteIfExistsProps {
  searchIn: HTMLBodyElement,
  selector: string,
  callback: Function,
}

/**
 * Execute function if found needed element
 * @param searchIn
 * @param selector
 * @param func
 */
export function executeIfExists({ searchIn, selector, callback }: ExecuteIfExistsProps): void {
  const element: HTMLBodyElement = searchIn.querySelector(selector);
  if (element) {
    callback(element);
  }
}
