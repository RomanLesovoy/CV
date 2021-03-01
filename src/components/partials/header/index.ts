import headerDom from './header.html';
import {bindTemplate, executeIfExists, ShadowMods, singleton} from '../../../utils';

export default class Header extends HTMLElement {
  shadow: HTMLBodyElement;
  constructor() {
    super();
    singleton(Header, this);
    this.shadow = bindTemplate({
      object: this,
      template: headerDom,
      selector: '#header',
      mode: ShadowMods.Closed,
    });
  }
  connectedCallback() {
    executeIfExists({
      searchIn: this.shadow,
      selector: '#header-text-content',
      callback: function(content: HTMLBodyElement) {
        content.innerHTML = 'Lesovoy Roman CV';
      },
    });
  }
}
