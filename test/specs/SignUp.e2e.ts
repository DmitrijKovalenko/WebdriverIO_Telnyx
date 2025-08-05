import { mainPage } from '../pages/mainPage';
import { signPage } from '../pages/signInPage';
import { acceptCookieBannerIfVisible } from '../helpers/interactionUtils'; 
import { acceptCookieBannerIfVisible2 } from '../helpers/interactionUtils'; 
import { signUpPage } from '../pages/signUpPage';
import * as newUsers from '../data/newUser.json';


describe('SignUp tests', () => {
 beforeEach(async () => {
  await browser.reloadSession();
   await browser.url('https://telnyx.com/');
     await browser.maximizeWindow();
     await acceptCookieBannerIfVisible();
    console.log(' Memory usage:', process.memoryUsage());   
     
 });
    afterEach(async () => {
  const handles = await browser.getWindowHandles();
  for (let i = handles.length - 1; i > 0; i--) {
    await browser.switchToWindow(handles[i]);
    await browser.closeWindow();
  }
  await browser.switchToWindow(handles[0]);
}); 

    it('should not sign up with empty credentials and show error ', async () => {
        const signUpButton = await mainPage.signUp;
        await signUpButton.waitForClickable({ timeout: 5000 });
        await signUpButton.click();
        await acceptCookieBannerIfVisible();
        await signPage.waitForHeader();
        await expect(signPage.createTelnyxAccount).toHaveText('Create a Telnyx account');
      await acceptCookieBannerIfVisible();
       await signUpPage.emailInput.waitForDisplayed({ timeout: 15000 });
        signUpPage.email = newUsers.invalidEmails.empty;
        signUpPage.firstName = newUsers.invalidFirstNames.empty;
        signUpPage.lastName = newUsers.invalidLastNames.empty;
        signUpPage.password = newUsers.invalidPasswords.empty;
       
        await signUpPage.fillForm();
        await signUpPage.clickSignUpButton();
        await expect(signUpPage.termsAndConditions).toHaveText('Please accept the terms and conditions');
    });
    
    it('should not sign up with empty email and empty password', async () => {
        const signUpButton = await mainPage.signUp;
        await signUpButton.waitForClickable({ timeout: 5000 });
        await signUpButton.click();
        await acceptCookieBannerIfVisible();
        await signPage.waitForHeader();
        await expect(signPage.createTelnyxAccount).toHaveText('Create a Telnyx account');
      await acceptCookieBannerIfVisible();
       await signUpPage.emailInput.waitForDisplayed({ timeout: 15000 });
        signUpPage.email = newUsers.invalidEmails.empty;
        signUpPage.firstName = newUsers.validUser.firstName;
        signUpPage.lastName = newUsers.validUser.lastName;
        signUpPage.password = newUsers.invalidPasswords.empty;
        await signUpPage.fillForm();
        await signUpPage.clickSignUpButton();
        await expect(signUpPage.emailError).toHaveText('This field is required.');
        await expect(signUpPage.passwordError).toHaveText('Password must:');
    });
    

 });