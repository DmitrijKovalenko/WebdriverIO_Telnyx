
import { passwordResetPage } from '../pages/passwordResetPage';
import { signPage } from '../pages/signInPage';
import { loginPage } from '../pages/loginPage';
import { acceptCookieBannerIfVisible } from '../helpers/interactionUtils'; 
import * as userData from '../data/user.json';


describe('Reset Pasword tests', () => {
 
  beforeEach(async () => {
    await browser.reloadSession();
    await browser.url('https://portal.telnyx.com/#/login/password-reset');
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
    
    
    // it('should successfully send a password reset email ', async () => {
    // loginPage.email = userData.validUser.email;
    // await passwordResetPage.fillResetEmailInput();
    // await passwordResetPage.resetPasswordButtonClick();
    // await expect(passwordResetPage.acceptedResetMsg).toContain('We have accepted your password reset request.');    

    // });
  
  
    // it('should NOT accept invalid email but does so (BUG)', async () => {
    // loginPage.email = userData.invalidEmails.doubleAt.email;
    // await passwordResetPage.fillResetEmailInput();
    // await passwordResetPage.resetPasswordButtonClick();
    // await expect(passwordResetPage.acceptedResetMsg).toContain('We have accepted your password reset request.');    

    // });
    
    it('should not accept an empty email on password reset form', async () => {
      loginPage.email = userData.invalidEmails.empty.email;
      await passwordResetPage.fillResetEmailInput();
      await passwordResetPage.passwordResetTitleClick();
      await passwordResetPage.requiredError.waitForDisplayed({ timeout: 10000 });
      await expect(passwordResetPage.requiredError).toHaveText('Required');
      await expect(passwordResetPage.resetPasswordButton).not.toBeClickable();
       
    });
  
      it('should navigate to the sign-up page when clicking "Need to sign up instead?', async () => {  
      await expect(passwordResetPage.passwordResetTitle).toHaveText('Password Reset');
      await passwordResetPage.alreadyHaveAccClick();
      await browser.pause(5000);
      await expect(loginPage.logInTitle).toHaveText('Log in');

      });
     it('should navigate to the login page when clicking "I already have an account.', async () => { 
    await expect(passwordResetPage.passwordResetTitle).toHaveText('Password Reset');
    await passwordResetPage.signIn.waitForDisplayed({ timeout: 5000 });
    await passwordResetPage.signInClick();
    await acceptCookieBannerIfVisible();
    const handles = await browser.getWindowHandles();
    expect(handles.length).toBeGreaterThan(1);
    await browser.switchToWindow(handles[handles.length - 1]);
    await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    return url !== 'about:blank';}, {
  timeout: 10000,
  timeoutMsg: 'New tab in Firefox did not finish loading'
});
    const newUrl = await browser.getUrl();
    await expect(newUrl).toContain('telnyx.com/sign-up');
    
  });
//     it('should NOT accept email with one letter but does so (BUG)', async () => {
//     loginPage.email = userData.invalidEmails.oneSymbol.email;
//     await passwordResetPage.fillResetEmailInput();
//     await passwordResetPage.resetPasswordButtonClick();
//     await expect(passwordResetPage.acceptedResetMsg).toContain('We have accepted your password reset request.');    

//     });
  
// it('should NOT accept 255 symbols in email but does so (BUG)', async () => {
//     loginPage.email = userData.invalidEmails.long255.email;
//     await passwordResetPage.fillResetEmailInput();
//     await passwordResetPage.resetPasswordButtonClick();
//     await expect(passwordResetPage.acceptedResetMsg).toContain('We have accepted your password reset request.');    

// });
    
//     it('should NOT accept 256 symbols in email but does so (BUG)', async () => {  
//     loginPage.email = userData.invalidEmails.long256.email;
//     await passwordResetPage.fillResetEmailInput();
//     await passwordResetPage.resetPasswordButtonClick();
//     await expect(passwordResetPage.acceptedResetMsg).toContain('We have accepted your password reset request.');    

//     });
  
 // it('should show an error when password reset limit is reached (BUG)', async () => {
 //   await passwordResetPage.fillResetEmailInput('valid@email.com');
 //   await passwordResetPage.resetPasswordButtonClick();
  //    Після 7 запитів на зміну паролю з валідною почтою ,запити більше не надходять а отже має бути повідомлення про 
  //   те що зкількість запитів обмежена
//});
      
  
    });
  