import { ChainablePromiseElement } from 'webdriverio';

class LoginPage {

    private _email: string = '';
    private _password: string = '';

    public get email(): string {
    return this._email;
     }

      public set email(value: string) {
    this._email = value;
     }

     public get password(): string {
    return this._password;
     }

      public set password(value: string) {
    this._password = value;
     }
     
  public get emailInput(): ChainablePromiseElement {
    return $('input[name="email"]');
  }

  public async enterEmailInput(): Promise<void> {
  await this.emailInput.waitForDisplayed({ timeout: 5000 });
  await this.emailInput.setValue(this._email);
}
    
    public get passwordInput(): ChainablePromiseElement {
    return $('input[type="password"][autocomplete="current-password"]');
  }

public async enterPasswordInput(): Promise<void> {
  await this.passwordInput.waitForDisplayed({ timeout: 5000 });
  await this.passwordInput.setValue(this._password);
}
  
   
  
public async fillLoginForm(): Promise<void> {
  await this.emailInput.waitForDisplayed({ timeout: 5000 });
  await this.emailInput.setValue(this._email);

  await this.passwordInput.waitForDisplayed({ timeout: 5000 });
  await this.passwordInput.setValue(this._password);
}
  public get loginButton(): ChainablePromiseElement {
    return $('.MuiButtonBase-root.MuiButton-root.MuiButton-contained');
  }

  public async clickLoginButton(): Promise<void> {

  await this.loginButton.waitForDisplayed({ timeout: 15000 });
  await this.loginButton.waitForClickable({ timeout: 15000 });
  await this.loginButton.click();
}

  public get logInTitle() {
    return $('.frontend-customer-portal-1ptee0p');
  }

  public get emailMSGError() {
    return $('.MuiFormHelperText-root.Mui-error');
  }
  public get invalidData() {
    return $('.MuiAlert-message.frontend-customer-portal-1xsto0d');
  }

  
  public get passwordMSGError() {
    return $('.MuiFormHelperText-root.Mui-error');
  }

  public get rememberMyEmail() {
    return $('.MuiTypography-root.MuiTypography-body2');
  }

  public async clickRememberMyEmail() {
    await this.rememberMyEmail.click();
  }
  
  public get forgotPassword() {
    return $('a[href="/#/login/password-reset"]');
  }

  public async clickForgotPassword() {
    await this.forgotPassword.click();
  }

  public get setUpLater() {
    return $('.MuiBox-root.frontend-customer-portal-1ektdzq [role="button"]');
  }
  //.MuiBox-root.frontend-customer-portal-1ektdzq .frontend-customer-portal-1rghx5t

  public async clickSetUpLater() { 
    await this.setUpLater.waitForDisplayed({ timeout: 15000 });  
    await this.setUpLater.waitForClickable({ timeout: 15000 });   
    await this.setUpLater.click();
  }   
}

export const loginPage: LoginPage = new LoginPage();