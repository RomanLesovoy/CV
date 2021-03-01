import pageDom from './app.html';
import styles from './app.css';
import { bindTemplate, ShadowMods, singleton } from '../../utils';

export default class App extends HTMLElement {
  constructor() {
    super();
    singleton(App, this);
    bindTemplate({
      object: this,
      template: pageDom,
      selector: '#app',
      mode: ShadowMods.Open,
    });
  }
  connectedCallback() {
    this.classList.add(styles.styleClassName);
  }
}
