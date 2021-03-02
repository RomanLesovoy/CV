import HtmlElementExtended from '../../HtmlElementExtended';

export class TabThird extends HtmlElementExtended {
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabThird',
      template: `
        <template id="tabThird">
           <p>Text 3</p>
        </template>
      `,
    });
  }
}
