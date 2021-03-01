import mainDom from './main.html';
import { bindTemplate, ShadowMods, singleton } from '../../../utils';

export default class Main extends HTMLElement {
  constructor() {
    super();
    singleton(Main, this);
    bindTemplate({
      object: this,
      template: mainDom,
      selector: '#main',
      mode: ShadowMods.Closed,
    });
  }
  connectedCallback() {}
}
