import yahooPage from '../page-objects/yahoo-search.page.ts';
import assert from 'assert';

describe("Search Yahoo Test", () => {
  it("Verify that the page title should be 'Yahoo Search - Web Search'", async () => {
    await yahooPage.open();

    assert.equal(await browser.getTitle(), 'Yahoo Search - Web Search');
  });

  it("Verify that the search results should be visible after typing the search text", async () => {
    await yahooPage.open();

    await yahooPage.enterText("Selenium Webdriver");
    yahooPage.search();

    assert.equal(await yahooPage.isSearched(), true);
  });
});
