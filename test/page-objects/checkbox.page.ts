import Page from './page.ts';

class CheckboxPage extends Page {
  /**
   * Define page elements
   */
  get lastCheckbox() {
    return $('#checkboxes input:last-Child');
  }
  get firstCheckbox() {
    return $('#checkboxes input:first-Child');
  }

  /**
   * Define or overwrite page methods
   */
  async open() {
    return super.open('checkboxes');
  }
}

export default new CheckboxPage();
