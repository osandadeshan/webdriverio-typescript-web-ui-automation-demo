
import inputsPage  from '../page-objects/herokuapp-inputs.page.ts';
import assert       from 'assert';

/*
	This is a BDD test using Mocha JavaScript framework
*/

describe('Test for herokuapp inputs page',  () =>  {
  it('should show the heading as Inputs ', async () =>  {
    await inputsPage.open();     // navigating to inputs page
    assert.equal(await inputsPage.getHeading(), "Inputs");
  });
});
