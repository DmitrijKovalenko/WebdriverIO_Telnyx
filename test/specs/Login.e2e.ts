import { loginPage }  from '../pages/loginPage';
import { mainPage } from '../pages/mainPage';
import { userPage } from '../pages/userPage';
import { passwordResetPage } from '../pages/passwordResetPage';
import * as userData from '../data/user.json';


 describe('Login tests', () => {
 beforeEach(async () => {
    await browser.reloadSession();
    await browser.url('https://telnyx.com/');
    await browser.maximizeWindow();
    console.log(' Memory usage:', process.memoryUsage());

  });

  it('should log in using valid credentials', async () => {
    await mainPage.clickAndNavigateToLogin();
    await loginPage.emailInput.waitForDisplayed({ timeout: 25000 }); //а вдруг поможет
    loginPage.email = userData.validUser.email;
    loginPage.password = userData.validUser.password;
    await loginPage.emailInput.waitForDisplayed({ timeout: 25000 }); //а вдруг поможет
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();
    await loginPage.setUpLater.waitForClickable({ timeout: 25000 });
    await loginPage.clickSetUpLater();
    const hometUrl = await browser.getUrl();
    await expect(hometUrl).toContain('https://portal.telnyx.com/#/home');
    await expect(userPage.welcomeText).toHaveText('Welcome, Dmytro!');

  });
   
   it('should log in using valid credentials and change account to dark mode', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.validUser.email;
    loginPage.password = userData.validUser.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();
    await loginPage.setUpLater.waitForClickable({ timeout: 15000 });
    await loginPage.clickSetUpLater();
    const hometUrl = await browser.getUrl();
    await expect(hometUrl).toContain('https://portal.telnyx.com/#/home');
    await expect(userPage.welcomeText).toHaveText('Welcome, Dmytro!');
    await userPage.clickAccountDropdown();
    await userPage.clickDarkModeSwitch();
   });


   it('should log in using valid credentials and sign Out', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.validUser.email;
    loginPage.password = userData.validUser.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();
    await loginPage.setUpLater.waitForClickable({ timeout: 15000 });
    await loginPage.clickSetUpLater();
    const hometUrl = await browser.getUrl();
    await expect(hometUrl).toContain('https://portal.telnyx.com/#/home');
    await expect(userPage.welcomeText).toHaveText('Welcome, Dmytro!');
    await userPage.clickAccountDropdown();
    await userPage.clickSignOut();
    await expect(loginPage.logInTitle).toHaveText('Log in');
  });
   
   it('should log in using valid credentials and remember my email btn', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.validUser.email;
    loginPage.password = userData.validUser.password;
    await loginPage.fillLoginForm();
    await loginPage.clickRememberMyEmail();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();
    await loginPage.setUpLater.waitForClickable({ timeout: 15000 });
    await loginPage.clickSetUpLater();
    const hometUrl = await browser.getUrl();
    await expect(hometUrl).toContain('https://portal.telnyx.com/#/home');
    await expect(userPage.welcomeText).toHaveText('Welcome, Dmytro!');
  });
   
   
   
    it('should not log in with empty email', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.invalidEmails.empty.email;
    loginPage.password = userData.validUser.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();
    await expect(loginPage.emailMSGError).toHaveText('Required'); 
    console.log(await loginPage.emailMSGError.getText());
    });
   
   it('should not log in with one symbol in email', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.invalidEmails.oneSymbol.email;
    loginPage.password = userData.validUser.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();    
    await expect(loginPage.emailMSGError).toHaveText('Please enter a valid email address.'); 
   });

   it('should not log in with 256 symbols in email', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.invalidEmails.long256.email;  
    loginPage.password = userData.validUser.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();    
     await expect(loginPage.invalidData).toHaveText('That email and password combination is not valid, or your browser could not be authenticated. Please try again.');
   
   });

   it('should not log in with 255 symbols in email', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.invalidEmails.long255.email;  
    loginPage.password = userData.validUser.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();    
     await expect(loginPage.invalidData).toHaveText('That email and password combination is not valid, or your browser could not be authenticated. Please try again.');
   
   });

    it('should not log in with double "@" in email', async () => {
    await mainPage.clickAndNavigateToLogin();
    await loginPage.emailInput.waitForDisplayed({ timeout: 10000 });
    loginPage.email = userData.invalidEmails.doubleAt.email;
    loginPage.password = userData.validUser.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();    
    await expect(loginPage.emailMSGError).toHaveText('Please enter a valid email address.');
   
    });
   

   it('should not log in with empty password', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.validUser.email;
    loginPage.password = userData.invalidPasswords.empty.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();
    await expect(loginPage.passwordMSGError).toHaveText('Required'); 
    console.log(await loginPage.passwordMSGError.getText());
   });
   
   it('should not log in with one symbol in password', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.validUser.email;
    loginPage.password = userData.invalidPasswords.oneSymbol.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();    
    await expect(loginPage.invalidData).toHaveText('That email and password combination is not valid, or your browser could not be authenticated. Please try again.');

   });

   it('should not log in with 256 symbols in password', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.validUser.email;
    loginPage.password = userData.invalidPasswords.long256.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();    
    await expect(loginPage.invalidData).toHaveText('That email and password combination is not valid, or your browser could not be authenticated. Please try again.');
   
   });

   it('should not log in with 255 symbols in password', async () => {
    await mainPage.clickAndNavigateToLogin();
    loginPage.email = userData.validUser.email;
    loginPage.password = userData.invalidPasswords.long255.password;
    await loginPage.fillLoginForm();
    await browser.waitUntil(async () => await loginPage.loginButton.isClickable(),{
    timeout: 15000,
      timeoutMsg: 'Login button did not become clickable in time'
    });
    await loginPage.clickLoginButton();    
    await expect(loginPage.invalidData).toHaveText('That email and password combination is not valid, or your browser could not be authenticated. Please try again.');

   });

   it('should navigate to the password reset page ', async () => {
       await mainPage.clickAndNavigateToLogin();
       await loginPage.clickForgotPassword();
       const currentUrl = await browser.getUrl();
       await expect(currentUrl).toContain('https://portal.telnyx.com/#/login/password-reset');   
       await expect(passwordResetPage.passwordResetTitle).toHaveText('Password Reset');
   
       });
   
   
    });