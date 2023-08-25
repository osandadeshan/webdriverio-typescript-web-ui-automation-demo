import DynamicPage from "../page-objects/dynamic.page.ts";

describe("Dynamic Loading Test", () => {
  it("Verify that the loading finished message should be visible on the page after the loading is completed", async () => {
    await DynamicPage.open();
    await expect(DynamicPage.loadingFinishedMessage).not.toBePresent();

    await DynamicPage.btnStart.click();
    
    await DynamicPage.loadingFinishedMessage.waitForExist({ timeout: 900000 });
    await expect(DynamicPage.loadingFinishedMessage).toBePresent();
  });
});
