import inputsPage from '../page-objects/herokuapp-inputs.page.ts';

describe("Herokuapp Inputs Page Test", () => {
  it("Verify that the page heading should be 'Inputs'", async () => {
    await inputsPage.open();

    expect(await inputsPage.getHeading()).toHaveText('Inputs');
  });
});
