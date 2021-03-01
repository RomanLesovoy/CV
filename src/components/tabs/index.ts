import tabsDom from './tabs.html';
import {bindTemplate, executeIfExists, ShadowMods, singleton, walkNodes} from '../../utils';

export default class Tabs extends HTMLElement {
  shadow: HTMLBodyElement;
  tabs: HTMLBodyElement;
  activeTab: any;
  constructor() {
    super();
    singleton(Tabs, this);
    this.shadow = bindTemplate({
      object: this,
      template: tabsDom,
      selector: '#tabs',
      mode: ShadowMods.Closed,
    });
  }
  connectedCallback() {
    const that = this;
    this.style.flex = '1';
    if (!that.querySelector('.select-tabs')) {
      throw 'Should contain {.select-tabs}';
    }
    if (this.children.length) {
      executeIfExists({
        searchIn: this.shadow,
        selector: '#tabs-content',
        callback: function(content: HTMLBodyElement) {
          walkNodes({
            from: that,
            func: (child: HTMLBodyElement) => {
              const cloned = child.cloneNode(true);
              if (child.classList.value.indexOf('select-tabs') !== -1) {
                that.tabs = cloned as HTMLBodyElement;
              }
              content.append(cloned)
            },
          });
          while (that.lastElementChild) {
            that.removeChild(that.lastElementChild);
          }
        },
      });
      this.setListenersOnTabs();
      this.setActiveTab();
    }
  }
  setListenersOnTabs() {
    for (let i = 0; i < this.tabs.children.length; i++) {
      /* @ts-ignore */
      this.tabs.children[i].onclick = function() {
        this.setActiveTab(i);
      }.bind(this);
    }
  }
  setActiveTab(tab: number = 0) {
    const activeClass = 'active';
    if (this.tabs.children[tab]) {
      if (this.activeTab) {
        this.activeTab.classList.remove(activeClass);
      }
      this.activeTab = this.tabs.children[tab];
      this.activeTab.classList.add(activeClass);
    }
  }
}
