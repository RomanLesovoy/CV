import HtmlElementExtended from '../../../../HtmlElementExtended';
import tabFourth from './tabFourth.html';

export class TabFourth extends HtmlElementExtended {
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabFourth',
      template: tabFourth,
    });
  }
}
