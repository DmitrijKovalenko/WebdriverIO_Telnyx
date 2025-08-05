import { ChainablePromiseElement } from 'webdriverio';
import { loginPage }  from '../pages/loginPage';

class MainPage{

    public get logInButtonHref(): ChainablePromiseElement {
    return $('.c-fuRoiU .c-ihSZrZ a[href="https://portal.telnyx.com"]');
    }
    
    public async login(): Promise<void> {
    await this.logInButtonHref.click();
  }

  public async clickAndNavigateToLogin() {
        await this.logInButtonHref.waitForDisplayed({ timeout: 15000 });
        await this.logInButtonHref.click();
        await browser.newWindow('https://portal.telnyx.com/#/login/sign-in');
        await loginPage.loginButton.waitForDisplayed({ timeout: 15000 });
  }
  
  public get linkedIn() {
    return $('a[href="https://www.linkedin.com/company/telnyx/"]');
  }

  public async linkedInClick(): Promise<void>  {
    await this.linkedIn.click();
  }
   public get facebookLink() {
    return $('a[href="https://www.facebook.com/Telnyx/"]');
  }

  public async facebookLinkClick(): Promise<void>  {
    await this.facebookLink.click();
  }

  public get twitterLink() {
    return $('a[href="https://twitter.com/telnyx"]');
  }

  public async twitterLinkClick(): Promise<void>  {
    await this.twitterLink.click();
  }

  public get signUp() {
    return $('#main-menu a[href="/sign-up"]');
  }
  public async signUpClick() {
    await this.signUp.click();
  }

  

}
export const mainPage: MainPage = new MainPage();