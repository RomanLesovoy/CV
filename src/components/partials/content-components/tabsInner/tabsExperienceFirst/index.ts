import HtmlElementExtended from '../../../../HtmlElementExtended';
import tab from './tabExperienceFirst.html';

export class TabExperienceFirst extends HtmlElementExtended {
  shadow: HTMLBodyElement;
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabExperienceFirst',
      template: tab,
    });
  }
}
