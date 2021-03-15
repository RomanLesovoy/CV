import tabsDom from './tabs.html';
import {executeIfExists, walkNodes, setRoute, textToUrl} from '../../utils';
import HtmlElementExtended from '../HtmlElementExtended';
import {Tab, templateKey, animateTextKey} from '../partials/content-components';

export default class Tabs extends HtmlElementExtended {
  shadow: HTMLBodyElement;
  tabs: HTMLBodyElement;
  createdElementsNames: any;
  activeTab: any;
  tabContent: any;
  animateChildText: boolean;
  isMainRoutes: boolean;
  constructor() {
    super();
    this.createdElementsNames = new Set();
    this.animateChildText = true;
    this.tabContent = new Tab();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabs',
      template: tabsDom,
      requiredChildElementsSelectors: ['.select-tabs', '.tabs-content', '.selected-tab-content'],
    });
  }
  tabRoute(tab: HTMLElement) {
    return tab.getAttribute('data-content') || '';
  }
  connectedCallback() {
    this.isMainRoutes = !!this.getAttribute('routes');
    this.style.flex = '1';
    this.setTabs();
    this.setTabContent();
    this.setListenersOnTabs();
    this.setClasses();
    this.findTabAndSetByRoute(window.location.pathname);
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
  setClasses() {
    const contentClassNames = this.getAttribute('contentClassNames');
    const tabsClassNames = this.getAttribute('tabsClassNames');
    if (contentClassNames) {
      this.tabContent.classList.add(contentClassNames);
    }
    if (tabsClassNames) {
      this.tabs.classList.add(tabsClassNames);
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
    walkNodes({
      from: this.tabs,
      func: (child: HTMLElement, i: number) => {
        child.onclick = () => this.setActiveTab(i);
      }
    });
  }
  toggleClassOnTab(tab: HTMLElement) {
    const activeClass = 'active';
    if (tab) {
      tab.classList.toggle(activeClass);
    }
  }
  setActiveTab(tab: number = 0) {
    this.toggleClassOnTab(this.activeTab);
    this.activeTab = this.tabs.children[tab];
    this.toggleClassOnTab(this.activeTab);
    this.setSelectedTabContent();
    this.setRoute();
  }
  createNewTabContent() {
    const tab = new Tab();
    tab.setAttribute(templateKey, this.tabRoute(this.activeTab));
    if (this.animateChildText && this.tabRoute(this.activeTab) === 'profile') { // just once
      tab.setAttribute(animateTextKey, "1");
      this.animateChildText = false;
    }
    return tab;
  }
  clearSelectedTabContent() {
    while (this.tabContent?.lastElementChild) {
      this.tabContent.removeChild(this.tabContent.lastElementChild);
    }
  }
  setSelectedTabContent() {
    this.clearSelectedTabContent();
    const tab = this.createNewTabContent();
    this.tabContent.appendChild(tab);
  }
  getTabUrl(tab: HTMLElement) {
    return textToUrl(this.tabRoute(tab));
  }
  setRoute() {
    setRoute(
      {
        newPathname: `/${this.getTabUrl(this.activeTab)}`,
        isMainRoute: !!this.isMainRoutes,
      });
  }
  findTabAndSetByRoute(route: string) {
    if (!textToUrl(route)) {
      route = 'profile';
    }
    walkNodes({
      from: this.tabs,
      func: (child: HTMLElement, i: number) => {
        if (this.getTabUrl(child) === textToUrl(route)) {
          this.setActiveTab(i);
        }
      }
    });
  }
}
