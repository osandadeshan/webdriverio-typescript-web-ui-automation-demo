import Page from './page.ts';

class DynamicPage extends Page {
  /**
   * Define page elements
   */
  get btnStart() {
    return $('button=Start');
  }
  get loadingFinishedMessage() {
    return $('#finish');
  }

  /**
   * Define or overwrite page methods
   */
  async open() {
    return super.open('dynamic_loading/2');
  }
}

export default new DynamicPage();
