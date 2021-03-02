import mainDom from './main.html';
import {singleton} from '../../../utils';
import HtmlElementExtended from '../../HtmlElementExtended';

export default class Main extends HtmlElementExtended {
  constructor() {
    super();
    singleton(Main, this);
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#main',
      template: mainDom,
    });
  }
}
