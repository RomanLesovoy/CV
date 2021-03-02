import tabsDom from './tabs.html';
import {executeIfExists, singleton, walkNodes} from '../../utils';
import HtmlElementExtended from '../HtmlElementExtended';

export default class Tabs extends HtmlElementExtended {
  shadow: HTMLBodyElement;
  tabs: HTMLBodyElement;
  activeTab: any;
  tabContent: any;
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabs',
      template: tabsDom,
      requiredChildElementsSelectors: ['.select-tabs'],
    });
    singleton(Tabs, this);
  }
  connectedCallback() {
    this.style.flex = '1';
    this.setTabs();
    this.setTabContent();
    this.setListenersOnTabs();
    this.setActiveTab();
  }
  setTabs() {
    const that = this;
    if (this.children.length) {
      executeIfExists({
        searchIn: this.shadow,
        selector: '.tabs-content',
        callback: function(content: HTMLBodyElement) {
          walkNodes({
            from: that,
            func: (child: HTMLBodyElement) => {
              const cloned = child.cloneNode(true);
              if (child.classList.value.indexOf('select-tabs') !== -1) {
                that.tabs = cloned as HTMLBodyElement;
              }
              content.append(cloned);
            },
          });
          while (that.lastElementChild) {
            that.removeChild(that.lastElementChild);
          }
        },
      });
    }
  }
  setTabContent() {
    const that = this;
    executeIfExists({
      searchIn: this.shadow,
      selector: '.selected-tab-content',
      callback: function(content: HTMLBodyElement) {
        that.tabContent = content;
      }
    })
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
      this.setSelectedTabContent(this.activeTab.getAttribute('data-component-name'));
    }
  }
  setSelectedTabContent(componentNameToShow: string) {
    while (this.tabContent.lastElementChild) {
      this.tabContent.removeChild(this.tabContent.lastElementChild);
    }
    this.tabContent.appendChild(document.createElement(componentNameToShow));
  }
}
