import HtmlElementExtended from '../../HtmlElementExtended';

export class TabSecond extends HtmlElementExtended {
  constructor() {
    super();
    super.run({
      child: this,
      bindTemplate: true,
      templateSelector: '#tabSecond',
      template: `
        <template id="tabSecond">
           <p>Text 2</p>
        </template>
      `,
    });
  }
}
