import HtmlElementExtended from '../../../../HtmlElementExtended';
import tabSecond from './tabSecond.html';

export class TabSecond extends HtmlElementExtended {
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabSecond',
      template: tabSecond,
    });
  }
}
