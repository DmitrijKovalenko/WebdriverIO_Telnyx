

class PasswordResetPage {
    private _email: string = '';
    public get email(): string {
    return this._email;
     }
public set email(value: string) {
    this._email = value;
     }
public get resetEmailInput() {
    return $('input[name="email"]');
  }

  public async fillResetEmailInput() {
    await this.resetEmailInput.setValue(this._email);
  }

  public get resetPasswordButton(){
    return $('//button[text()="Reset password"]');
  }

  public async resetPasswordButtonClick() {
    await this.resetPasswordButton.waitForDisplayed({ timeout: 15000 });
    await this.resetPasswordButton.click();
    }
    
  public get passwordResetTitle() {
        return $('//h1[text()="Password Reset"]');
  }

  public async passwordResetTitleClick() {
    await this.passwordResetTitle.click();
  }
  
  public get acceptedResetMsg() {
    
    return $('.MuiBox-root.frontend-customer-portal-1qm1lh');
  }

  public get requiredError() {
    return $('.MuiFormHelperText-root.Mui-error');
  }
  
  public get signIn() {
    return $('a[href="https://telnyx.com/sign-up"]')
  }

  public async signInClick() {
    await this.signIn.click();
  }

  public get alreadyHaveAcc() {
    return $('a[href="/#/login/sign-in"]')
  }

  public async alreadyHaveAccClick() {
    await this.alreadyHaveAcc.click();
  }

}


export const passwordResetPage: PasswordResetPage = new PasswordResetPage();