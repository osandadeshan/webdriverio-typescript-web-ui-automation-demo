import Page from './page.ts';

class YahooPage extends Page {
  /**
   * Define page elements
   */
  get searchInput() {
    return $("#yschsp");
  }
  get searchButton() {
    return $(".mag-glass");
  }
  get resultsList() {
    return $("#results");
  }

  /**
   * Define or overwrite page methods
   */
  async open() {
    await super.open("https://search.yahoo.com");
  }

  /**
   * Page specific methods
   */
  async enterText(item: string | number) {
    await this.searchInput.clearValue();
    await this.searchInput.setValue(item);
  }

  async search() {
    await this.searchButton.click();
  }

  async isSearched() {
    await this.resultsList.waitForDisplayed(1000);
    return this.resultsList.isDisplayed();
  }
}

export default new YahooPage();
