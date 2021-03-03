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
  searchIn: HTMLBodyElement | ShadowRoot,
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

interface WalkNods {
  from: HTMLBodyElement | any,
  func: Function,
}

/**
 * Walk through nodes and call callback
 * @param from
 * @param func
 */
export function walkNodes({ from, func }: WalkNods) {
  for (let i = 0; i < from.children.length; i++) {
    const child = from.children[i];
    if (typeof child === 'object') {
      func(child);
    }
  }
}

interface AnimateTextTyping {
  element: HTMLBodyElement,
  text: string,
  delay: number,
}

/**
 * Animate text typing
 * @param element
 * @param text
 * @param delay
 */
export function animateTextTyping({ element, text, delay }: AnimateTextTyping) {
  (function recursiveAddLetters(i = 0) {
    element.textContent += text[i];
    if (i < text.length - 1) {
      setTimeout(() => recursiveAddLetters(i + 1), delay);
    }
  })();
}
