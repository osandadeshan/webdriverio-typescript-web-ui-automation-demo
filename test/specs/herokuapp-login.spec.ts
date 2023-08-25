import loginPage from '../page-objects/herokuapp-login.page.ts';
import landingPage from '../page-objects/herokuapp-landing.page.ts';
import assert from 'assert';

describe("Herokuapp Login Test", () => {
  it("Verify that a user can login to the appliation with valid credentials", async () => {
    await loginPage.open();

    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    
    assert.equal(
      await landingPage.getMessage(),
      'Welcome to the Secure Area. When you are done click logout below.'
    );
  });

  it("Verify that a user cannot login to the appliation with invalid credentials", async () => {
    await loginPage.open();

    await loginPage.login('tomsmith', 'SuperSecretPassword');
    
    assert.equal(
      await loginPage.getLoginError(),
      'Your password is invalid!\n×'
    );
  });
});
