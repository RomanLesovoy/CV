import footerDom from './footer.html';
import {bindTemplate, ShadowMods, singleton, executeIfExists} from '../../../utils';

export default class Footer extends HTMLElement {
  shadow: HTMLBodyElement;
  constructor() {
    super();
    singleton(Footer, this);
    this.shadow = bindTemplate({
      object: this,
      template: footerDom,
      selector: '#footer',
      mode: ShadowMods.Closed,
    });
  }
  connectedCallback() {
    executeIfExists({
      searchIn: this.shadow,
      selector: '#footer-text-content',
      callback: function(content: HTMLBodyElement) {
        content.innerHTML = `2021 - ${new Date().getFullYear()}`;
      },
    });
  }
}
