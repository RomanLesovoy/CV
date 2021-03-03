import HtmlElementExtended from '../../../../HtmlElementExtended';
import tabThird from './tabThird.html';

export class TabThird extends HtmlElementExtended {
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabThird',
      template: tabThird,
    });
  }
}
