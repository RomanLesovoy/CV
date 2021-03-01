import photoDom from './photo.html';
import {bindTemplate, executeIfExists, ShadowMods, singleton} from '../../../utils';

const photoPath = 'photoPath';
export default class Photo extends HTMLElement {
  shadow: HTMLBodyElement;
  image: any;
  constructor() {
    super();
    singleton(Photo, this);
    this.initImage();
    this.shadow = bindTemplate({
      object: this,
      template: photoDom,
      selector: '#photo',
      mode: ShadowMods.Closed,
    });
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
