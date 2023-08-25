import Page from './page.ts';

class LandingPage extends Page {
  /**
   * Define page elements
   */
  get accountMessage() {
    return $('//*[@class="subheader"]');
  }

  /**
   * Define or overwrite page methods
   */
  async open() {
    await super.open('http://www.phptravels.net/account');
  }

  /**
   * Page specific methods
   */
  async waitForLandingPageToLoad() {
    if (!(await this.accountMessage.isDisplayed())) {
      await this.accountMessage.waitForDisplayed(5000);
    }
  }

  async getMessage() {
    return this.accountMessage.getText();
  }
}

export default new LandingPage();
