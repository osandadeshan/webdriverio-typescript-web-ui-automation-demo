import Page from './page.ts';

class InputsPage extends Page {
  /**
   * define elements
   */
  get heading() {
    return $('//h3');
  }

  /**
   * define or overwrite page methods
   */
  async open() {
    await super.open('inputs');
  }

  /**
   * your page specific methods
   */
  async getHeading() {
    return this.heading.getText();
  }
}

export default new InputsPage();
