import Header from './partials/header';
import Footer from './partials/footer';
import Main from './partials/main';
import App from './app/app';
import Tabs from './tabs';
import Photo from './partials/photo';
import { TabFirst, TabSecond, TabThird, TabFourth, TabExperienceFirst } from './partials/content-components';

import { componentName } from '../utils';

export const createdElementsNamesSaved = new Set();

export const components: Array<CustomElementConstructor> = [
  Header, Footer, Main, Tabs, Photo,
  TabFirst, TabSecond, TabThird, TabFourth, TabExperienceFirst,
  App,
];

function defineComponents(components: Array<CustomElementConstructor>) {
  components.forEach((component) => {
    customElements.define(componentName(component), component);
  })
}
defineComponents(components);

function appendComponent(component: CustomElementConstructor, parentNode = document.body) {
  const createdElement = document.createElement(componentName(component));
  parentNode.appendChild(createdElement);
}
appendComponent(App);
