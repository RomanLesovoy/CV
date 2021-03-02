import photoDom from './photo.html';
import {executeIfExists, singleton} from '../../../utils';
import HtmlElementExtended from '../../HtmlElementExtended';

const photoPath = 'photoPath';
export default class Photo extends HtmlElementExtended {
  shadow: HTMLBodyElement;
  image: any;
  constructor() {
    super();
    singleton(Photo, this);
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#photo',
      template: photoDom,
    });
    this.initImage();
  }
  initImage() {
    if (!this.image) {
      this.image = document.createElement('img');
    }
    this.image.src = this.getAttribute(photoPath);
  }
  static get observedAttributes() { return [photoPath]; }
  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (name === photoPath) {
      this.initImage();
    }
  }
  connectedCallback() {
    const that = this;
    executeIfExists({
      searchIn: this.shadow,
      selector: '#photo-content',
      callback: function(content: HTMLBodyElement) {
        content.append(that.image)
      },
    });
  }
}
