import HtmlElementExtended from '../../HtmlElementExtended';

export class TabFirst extends HtmlElementExtended {
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabFirst',
      template: `
        <template id="tabFirst">
           <p>Text 1</p>
        </template>
      `,
    });
  }
}
