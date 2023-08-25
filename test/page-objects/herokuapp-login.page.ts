import Page from './page.ts';

class LoginPage extends Page {
  /**
   * define elements
   */
  get usernameInput() {
    return $('//*[@name="username"]');
  }
  get passwordInput() {
    return $('//*[@name="password"]');
  }
  get loginButton() {
    return $('//button[contains(., "Login")]');
  }
  get loginError() {
    return $('#flash');
  }

  /**
   * define or overwrite page methods
   */
  async open() {
    await super.open('login');
  }

  /**
   * your page specific methods
   */
  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async getLoginError() {
    return this.loginError.getText();
  }
}

export default new LoginPage();
