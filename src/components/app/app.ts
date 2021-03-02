import pageDom from './app.html';
import styles from './app.css';
import {singleton} from '../../utils';
import HtmlElementExtended from '../HtmlElementExtended';

export default class App extends HtmlElementExtended {
  constructor() {
    super();
    singleton(App, this);
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#app',
      template: pageDom,
    });
  }
  connectedCallback() {
    this.classList.add(styles.styleClassName);
  }
}
