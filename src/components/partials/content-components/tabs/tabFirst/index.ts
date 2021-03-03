import HtmlElementExtended from '../../../../HtmlElementExtended';
import tabFirst from './tabFirst.html';
import {animateTextTyping} from '../../../../../utils';
import {createdElementsNamesSaved} from '../../../../index';

export class TabFirst extends HtmlElementExtended {
  shadow: HTMLBodyElement;
  contentElement: any;
  contentToShow: any;
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabFirst',
      template: tabFirst,
      requiredChildElementsSelectors: ['#tabFirstContent'],
    });
  }
  connectedCallback() {
    this.animateText();
  }
  animateText() {
    if (!createdElementsNamesSaved.has(this.constructor.name)) {
      this.beforeAnimateText();
      animateTextTyping({
        element: this.contentElement,
        text: this.contentToShow,
        delay: 10,
      });
      createdElementsNamesSaved.add(this.constructor.name);
    }
  }
  beforeAnimateText() {
    this.contentElement = this.shadow.querySelector('#tabFirstContent');
    this.contentToShow = this.contentElement.textContent.trim();
    this.contentElement.textContent = '';
  }
}
