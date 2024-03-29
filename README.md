# WebDriverIO TypeScript Web UI Automation Demo

This repository contains a collection of sample webdriverIO (v8) projects and libraries that demonstrate how to use the tool and develop automation scripts using the Mochajs BDD framework. It uses the `chromedriver` NPM package that wraps the ChromeDriver for you. This service does not require a Selenium server but uses ChromeDriver to communicate with the browser directly.

This boilerplate code supports Typescript, also provides sample utilities to read data from MS Excel, and executes SQL statements to any database (RDBMS such as Oracle, TeraData, MySQL, Vertica) for end-to-end testing. It generates Allure, JSON, Junit/Xunit, and Spec reporters as well. `Please note that at the time of writing (January 2023) the wdio reporting module of JSON, Junit/Xunit are not fully compatible with V8 hence it is disabled from this boilerplate code.`


## Installation
This project is tested on **Node v18.0.0** and above.  While earlier versions of the Node may be compatible, they have not been verified.

* **Node.JS**: Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally.

* **JDK**: It is optional, install JDK and make sure the classpath is set properly. JAVA is required to start `Selenium Server` on your local environment nothing else.

## Selenium Tests / Appium Tests

To run your test you must have the Selenium / Appium server up and running to execute any webdriverIO tests, or it will fail fast with an error. To start selenium automatically it has been added as part of `services: ['selenium-standalone']` and `services: ['appium']` in the *.conf.ts.  That's all there is to it.!.

## Run Some Sample Tests

To execute the entire test suite on local development or cloud provider, you can use the below

* **Option 1**: Local Environment `npm run test-local`.

* **Option 2**: You can also run in `SauceLabs` or  `BrowserStack` or `LambdaTest` using `npm run test-sauce` or `npm run test-browserstack` or `npm run test-browserstack`.

* **Option 3**: Mobile Device. To execute tests on mobile devices use: `npm run test-mobile`.

💡 Before running mobile tests, perform the requisite Appium setup. Refer [Appium Docs](http://appium.io/getting-started.html?lang=en)

## Config Files

WebdriverIO uses configuration files to set up and execute tests in specific ways.  The configuration is fully customizable, and different functions can be invoked before, during, and after each test or test suite.  Config files are found in the `the root directory of this boilerplate project.` and all ends with `*.conf.ts`.  These can be called via the CLI.

## SauceLabs / BrowserStack / LambdaTest Integration

`SauceLabs`, `BrowserStack`, and `lambdatest` specific code has been added in the `wdio.sauce.conf.ts`, `wdio.browserstack.conf.ts` and `wdio.lambdatest.conf.ts` under the `/test/config` folder. You just need to provide your SauceLabs/BrowserStack/LambdaTest credentials in the config file. To run tests on SauceLabs, execute the command `npm run test-sauce` to run tests on BrowserStack `npm run test-browserstack`, to run tests on LambdaTest `npm run test-lambdatest`.

## Logs  

A complete set of execution `logs` will be generated during the run time and can be found in the parent folder location `/logs`.

## Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.

### 1. Allure Reporter

The Allure Reporter creates [Allure](https://docs.qameta.io/allure/) test reports which is an HTML-generated website with all necessary information to debug your test results and take a look at error screenshots. Add allure to the reporters' array in the config file and define the output directory of the allure reports.  Please note, this has been added in wdio.shared.config.

To generate and view an Allure report inside your corp network or locally, run `npm run allure-report`. The Allure report is hosted on a `web server` and can be accessed through http://YourMachineIP:5050/ and also generated locally which can be found at `./allure-report/index.html`. A typical Allure report will look like this.

![ScreenShot](https://user-images.githubusercontent.com/9147189/263193450-74e9bf79-4e04-4b3b-ba09-8717e6c017a5.png)

### 2. Spec Reporter

The Spec Reporter prints detailed results to the console.
![Screenshot](https://user-images.githubusercontent.com/9147189/263204618-9418ac96-513b-41c5-8aad-0c95dbe6227a.png)

## Develop automation scripts (for both desktop browser and mobile browser/app)

You can write tests by using the Mocha BDD framework. You can choose a TypeScript/JavaScript based design pattern or ES6 based. More about Mocha can be found at  https://mochajs.org/

Refer to complete [WebdriverIO v8 API](https://webdriver.io/docs/api) methods to write your automation tests.

Sample tests are located in `*.specs.js` files in the `/test/specs/` directory. A typical test will look similar to this:
```typescript
//example (pls refer to page object classes and spec files)

//a test using async mode//

describe('Performing a search operation on Yahoo Page',  () =>  {
  it('Performing a search operation', async () =>  {
    await yahooPage.open();
    assert.equal(await browser.getTitle(), 'Yahoo Search - Web Search');
  });
});

```
## The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other words, one of the challenges of writing test automation is keeping your [selectors] (classes, IDs, or Xpaths, etc.) up to date with the latest version of your code.  The next challenge is to keep the code you write nice and [DRY] (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  Instead of including our selectors in the Spec file (in Mocha), we place them in a `<pagename>.ts` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When A test fails, it fails on an individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern.  This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.ts`.  These will require the basic `page.ts` prototype construct / abstract class and create new objects for each individual page.

For more information on the implementation of the `Page Object Design Pattern`, refer to the `/test/page-objects` directory. A typical page class using ES6 syntax will look similar to this:

💡 If you want to use ES5 syntax, refer to the sample.page.js under util-examples.

```typescript
import Page from './page';
class LoginPage extends Page {

    /**
    * Define page elements
    */
    get usernameInput()   { return $('//*[@name="username"]'); }
    get passwordInput()   { return $('//*[@name="password"]'); }
    get loginButton()     { return $('//button[contains(., "Login")]'); }

    /**
     * Define or overwrite page methods
     */
    async open() {
        await super.open('login')
    }

    /**
     * Page specific methods
     */
    async login(username, password) {
      await this.usernameInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.loginButton.click();
    }
}

export default new LoginPage()

```

## Working with DataBase

A relational database is, simply, a database that stores related information across multiple tables and allows you to query information in more than one table at the same time. Your application under test displays data from this database. So when you are actually performing automation testing it is very likely that you need to verify the data between actual (which you got from the browser) Vs expected (which you will get from the database by executing SQL statements on the database). This can be done by the below statements in your code.

```javascript
//example of connection to Oracle DataBase

var  db   = require('node-any-jdbc');

cogfig = {
  libpath: './config/drivers/oracle/ojdbc7.jar',
  drivername: 'oracle.jdbc.driver.OracleDriver',
  url:  'jdbc:oracle:thin:QA/password123@//abc-test.corp.int:1527/stage1'
};

//example of sample select query to fetch the result set

var sql = 'SELECT * FROM emp_info where emp_id = "1001"';
db.execute(cogfig, sql, function(results){
  console.log(results);
});

```
For trouble shooting and more information, please visit `node-any-jdbc` module which can be [found here](https://www.npmjs.com/package/node-any-jdbc)

Note: `node-any-jdbc` is NOT packaged under this project. If you need, you can install it and start using it right away. You can also find sample examples under `/util-examples/database-example.js`

## Working with MS-Excel

You can use MS Excel and store your test data, and expected data in an Excel sheet. You can keep any number of Excel sheets you want and use the below common methods to pull data from your sheet to be used as part of testing.  Please note it only supports the .xlsx file format. For more information refer to the `common-utilities.js` and `util-examples`

```javascript
//example of pulling data from MS Excel

var  utl  = require('../utilities/common-utilities.js');
utl.excel_getTableRow(__dirname+'/sample.xlsx', 'info', 'emp_id', '101', function(results){
  // returns only one row based on the condition
  console.log(results);
  console.log(results.emp_id);
});

utl.excel_getTableRows(__dirname+'/sample.xlsx', 'address', function(results){
  // returns all rows of the specified sheet
  console.log(results[1]);
  //then do what ever validation you to do withe results
});

utl.excel_getAllSheetData(__dirname+'/sample.xlsx', function(results){
  // returns all sheets data of a excel file
  console.log(results);
  //then do what ever validation you to do withe results
});

```

## Common utilities

Refer to the common Javascript functions that provide clean, performant methods for manipulating objects, collections, MS-Excel utilities, DataBase utilities, etc. A few sample codes can be found in ./util-examples/

Use [Underscore.js](http://underscorejs.org/) already bundled inside the framework which provides over 100 functions that support both your favorite workaday functional helpers: map, filter, invoke — as well as more specialized goodies: function binding, javascript templating, creating quick indexes, deep equality testing, and so on.

## License

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/License_icon-mit-2.svg/2000px-License_icon-mit-2.svg.png" alt="MIT License" width="100" height="100"/> [MIT License](https://opensource.org/licenses/MIT)

## Copyright

Copyright 2023 [MaxSoft](https://maxsoftlk.github.io/).
