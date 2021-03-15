import HtmlElementExtended from '../../../HtmlElementExtended';
import {animateTextTyping} from '../../../../utils';
import tabsContent from './tabs';

export const templateKey = 'template';
export const animateTextKey = 'data-animate-text';

export class Tab extends HtmlElementExtended {
  shadow: HTMLBodyElement;
  template: any;
  contentElement: any;
  contentToShow: any;
  setTemplate(templateKey = 'profile') {
    super.run({
      child: this,
      bindTemplate: true,
      // @ts-ignore
      template: tabsContent[templateKey],
      templateSelector: '#tab',
    });
  }
  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (name === templateKey) {
      this.setTemplate(newValue);
    }
  }
  connectedCallback() {
    this.setTemplate(this.getAttribute(templateKey));
    if (!!this.getAttribute(animateTextKey)) {
      this.contentElement = this.shadow.querySelector('.animateText');
      if (this.contentElement) {
        this.animateText();
      }
    }
  }
  animateText() {
    this.beforeAnimateText();
    animateTextTyping({
      element: this.contentElement,
      text: this.contentToShow,
      delay: 10,
    });
  }
  beforeAnimateText() {
    this.contentToShow = this.contentElement.textContent.trim();
    this.contentElement.textContent = '';
  }
}
