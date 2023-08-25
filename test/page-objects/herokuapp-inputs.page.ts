import Page from './page.ts';

class InputsPage extends Page {
  /**
   * Define page elements
   */
  get heading() {
    return $('//h3');
  }

  /**
   * Define or overwrite page methods
   */
  async open() {
    await super.open('inputs');
  }

  /**
   * Page specific methods
   */
  async getHeading() {
    return this.heading.getText();
  }
}

export default new InputsPage();
