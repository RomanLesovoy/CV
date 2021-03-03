import {bindTemplate, ShadowMods} from '../utils';

interface InterfaceChildObject {
  child: any, // fixme
  templateSelector: string, // fixme
  template: any, // fixme
  bindTemplate: boolean,
  requiredChildElementsSelectors?: Array<string>,
  mode?: ShadowMods,
}
export default class HtmlElementExtended extends HTMLElement {
  protected run(childObject: InterfaceChildObject) {
    if (childObject.bindTemplate) {
      HtmlElementExtended.bindTemplate(childObject);
    }
    const valid = HtmlElementExtended.validate(childObject);
    if (!valid) {
      childObject.child = undefined;
      return false;
    }
    return true;
  }
  private static bindTemplate(childObject: InterfaceChildObject) {
    childObject.child.shadow = bindTemplate({
      object: childObject.child,
      template: childObject.template,
      selector: childObject.templateSelector,
      mode: childObject.mode || ShadowMods.Closed,
    });
  }
  private static validate(childObject: InterfaceChildObject) {
    let valid = true;
    if (childObject.requiredChildElementsSelectors) {
      childObject.requiredChildElementsSelectors.forEach((componentSelector: string) => {
        if (!childObject.child.querySelector(componentSelector) && !childObject.child.shadow?.querySelector(componentSelector)) {
          valid = false;
          throw new Error(`${childObject.child.constructor.name} should contain {${componentSelector}} element`);
        }
      });
    }
    return valid;
  }
}
