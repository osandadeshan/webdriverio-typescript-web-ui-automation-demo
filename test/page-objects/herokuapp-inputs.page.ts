import Page from './page.ts';
//import utl   from '../../utilities/common-utilities';

class InputsPage extends Page {

    /**
    * define elements
    */

    get heading()   { return $('//h3'); }

    /**
     * define or overwrite page methods
     */
    async open() {
        await super.open('inputs')       //this will append `inputs` to the baseUrl to form complete URL
        //browser.pause(3000);
    }
    /**
     * your page specific methods
     */

    async getHeading() {
      return this.heading.getText();
   }
}

export default new InputsPage()
