import CheckboxPage from '../page-objects/checkbox.page.ts';

describe("Checkbox Behavior Test", () => {
  it("Verify that the last checkbox should be enabled by default", async () => {
    await CheckboxPage.open();

    await expect(CheckboxPage.firstCheckbox).not.toBeSelected();
    await expect(CheckboxPage.lastCheckbox).toBeSelected();
  });

  it("Verify that the first checkbox should be enabled after clicking on it", async () => {
    await CheckboxPage.open();
    await expect(CheckboxPage.firstCheckbox).not.toBeSelected();
    
    await CheckboxPage.firstCheckbox.click();

    await expect(CheckboxPage.firstCheckbox).toBeSelected();
  });
});
