import { signPage } from '../pages/signInPage';
import { acceptCookieBannerIfVisible } from '../helpers/interactionUtils'; 
import { acceptCookieBannerIfVisible2 } from '../helpers/interactionUtils'; 
import { signUpPage } from '../pages/signUpPage';
import * as newUsers from '../data/newUser.json';


describe('SignUp tests', () => {
 beforeEach(async () => {
  await browser.reloadSession();
   await browser.url('https://telnyx.com/sign-up');
     await browser.maximizeWindow();
     await acceptCookieBannerIfVisible2();
     
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
        await signPage.waitForHeader();
        await expect(signPage.createTelnyxAccount).toHaveText('Create a Telnyx account');
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
        await signPage.waitForHeader();
        await expect(signPage.createTelnyxAccount).toHaveText('Create a Telnyx account');
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
    
  it('should show error with invalid email format and valid password', async () => {
    signUpPage.email = newUsers.invalidEmails.doubleAt;
    signUpPage.firstName = newUsers.validUser.firstName;
    signUpPage.lastName = newUsers.validUser.lastName;
    signUpPage.password = newUsers.validUser.password;
    signUpPage.acceptTerms = true;
    await signUpPage.fillForm();
    await signUpPage.submit();
    const errorText = await signUpPage.registrOREmailAndPasswordError.getText();

expect(
  errorText === 'You cannot register using an email from this provider. Please register with a different email address.' ||
  errorText === 'That email and password combination is not valid, or your browser could not be authenticated. Please try again.'
).toBe(true);
   
  });

  it('should show error with too short password', async () => {
    signUpPage.email = newUsers.validUser.email;
    signUpPage.firstName = newUsers.validUser.firstName;
    signUpPage.lastName = newUsers.validUser.lastName;
    signUpPage.password = newUsers.invalidPasswords.oneSymbol;
    signUpPage.acceptTerms = true;
    await signUpPage.fillForm();
    await signUpPage.submit();
    await expect(signUpPage.passwordError).toHaveText('Password must:');
  });
  it('should show error when email exceeds max length', async () => {
    signUpPage.email = newUsers.invalidEmails.long256;
    signUpPage.firstName = newUsers.validUser.firstName;
    signUpPage.lastName = newUsers.validUser.lastName;
    signUpPage.password = newUsers.validUser.password;
    signUpPage.acceptTerms = true;
    await signUpPage.fillForm();
    await signUpPage.submit();
    const errorText = await signUpPage.registrOREmailAndPasswordError.getText();
    expect(
  errorText === 'You cannot register using an email from this provider. Please register with a different email address.' ||
  errorText === 'That email and password combination is not valid, or your browser could not be authenticated. Please try again.'
).toBe(true);
  });
  it('should show error when email exceeds 255 symbols length', async () => {
    signUpPage.email = newUsers.invalidEmails.long255;
    signUpPage.firstName = newUsers.validUser.firstName;
    signUpPage.lastName = newUsers.validUser.lastName;
    signUpPage.password = newUsers.validUser.password;
    signUpPage.acceptTerms = true;
    await signUpPage.fillForm();
    await signUpPage.submit();
    const errorText = await signUpPage.registrOREmailAndPasswordError.getText();
    expect(
  errorText === 'You cannot register using an email from this provider. Please register with a different email address.' ||
  errorText === 'That email and password combination is not valid, or your browser could not be authenticated. Please try again.'
).toBe(true);
  });

  it('should show error when password exceeds max length', async () => {
    signUpPage.email = newUsers.validUser.email;
    signUpPage.firstName = newUsers.validUser.firstName;
    signUpPage.lastName = newUsers.validUser.lastName;
    signUpPage.password = newUsers.invalidPasswords.long256;
    signUpPage.acceptTerms = true;
    await signUpPage.fillForm();
    await signUpPage.submit();
    await expect(signUpPage.passwordError).toHaveText('Password must:');

  });
  // it.only('should click on sign up with Google', async () => {
  //   await signUpPage.signUpWithGoogle.scrollIntoView();
  //   await signUpPage.signUpWithGoogle.waitForDisplayed({ timeout: 25000 });
  //   await signUpPage.signUpWithGoogle.waitForClickable({ timeout: 25000 });
  //   await signUpPage.clickSignUpWithGoogle();
  //   const hometUrl = await browser.getUrl();
  //   await expect(hometUrl).toContain('https://accounts.google.com/');
  // });

    

 });