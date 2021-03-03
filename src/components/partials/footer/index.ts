import footerDom from './footer.html';
import {singleton, executeIfExists} from '../../../utils';
import HtmlElementExtended from '../../HtmlElementExtended';

export default class Footer extends HtmlElementExtended {
  shadow: HTMLBodyElement;
  constructor() {
    super();
    singleton(Footer, this);
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#footer',
      template: footerDom,
      requiredChildElementsSelectors: ['#footer-text-content'],
    });
  }
  connectedCallback() {
    executeIfExists({
      searchIn: this.shadow,
      selector: '#footer-text-content',
      callback: function(content: HTMLBodyElement) {
        content.innerHTML = `FULL-STACK WEB DEVELOPER`;
      },
    });
  }
}
