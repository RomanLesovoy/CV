import headerDom from './header.html';
import {executeIfExists, singleton} from '../../../utils';
import HtmlElementExtended from '../../HtmlElementExtended';

export default class Header extends HtmlElementExtended {
  shadow: HTMLBodyElement;
  constructor() {
    super();
    singleton(Header, this);
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#header',
      template: headerDom,
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
