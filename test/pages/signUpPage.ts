import { signPage } from '../pages/signInPage';

class SignUpPage {
  private _email = '';
  private _firstName = '';
  private _lastName = '';
  private _password = '';
  private _promoCode = '';
  private _acceptTerms = false;
  private _subscribeMarketing = false;

  
  public set email(value: string) {
    this._email = value;
}

public set firstName(value: string) {
    this._firstName = value;
}

public set lastName(value: string) {
    this._lastName = value;
}

public set password(value: string) {
    this._password = value;
}

public set promoCode(value: string) {
    this._promoCode = value;
}

public set acceptTerms(value: boolean) {
    this._acceptTerms = value;
}

public set subscribeMarketing(value: boolean) {
    this._subscribeMarketing = value;
}

  
  public get emailInput() { return $('input[name="email"]');}
  public get firstNameInput() { return $('#first_name'); }
  public get lastNameInput() { return $('#last_name'); }
  public get passwordInput() { return $('#password'); }
  public get promoCodeInput() { return $('#promo_code'); }
  public get acceptTermsCheckbox() { return $('#terms_and_conditions'); }
  public get subscribeMarketingCheckbox() { return $('#subscription_opt_in'); }
  public get signUpButton() { return $("//span[text()='SIGN UP']"); }
 public async clickPromoCodeInput(): Promise<void> {
    await this.promoCodeInput.click();
  }

  public async clickAcceptTermsCheckbox(): Promise<void> {
    if (!(await this.acceptTermsCheckbox.isSelected())) {
      await this.acceptTermsCheckbox.click();
    }
  }

  public async clickSubscribeMarketingCheckbox(): Promise<void> {
    if (!(await this.subscribeMarketingCheckbox.isSelected())) {
      await this.subscribeMarketingCheckbox.click();
    }
  }

  public async clickSignUpButton(): Promise<void> {
    await this.signUpButton.click();
  }
  
  public async fillForm(): Promise<void> {
    await this.emailInput.waitForDisplayed({ timeout: 15000 });
    await this.emailInput.setValue(this._email);
    await this.firstNameInput.setValue(this._firstName);
    await this.lastNameInput.setValue(this._lastName);
    await this.passwordInput.setValue(this._password);
    if (this._promoCode) {
      await this.promoCodeInput.setValue(this._promoCode);
    }
    if (this._acceptTerms) {
      await this.acceptTermsCheckbox.click();
    }
    if (this._subscribeMarketing) {
      await this.subscribeMarketingCheckbox.click();
    }
  }

  public async submit(): Promise<void> {
    await this.signUpButton.click();
  }
  
  public get termsAndConditions() {
    return $('#terms_and_conditions_message');  
  }
  public get passwordError() {
    return $('#password_message');
  }
  public get emailError() {
    return $('#email_message');
  }
public get registrOREmailAndPasswordError() {
    return $('.c-UUKrH.c-UUKrH-kDyeyw-type-error');
  }

  public get signUpWithGoogle() {
    return $('//span[text()="Sign up with Google"]');
  }

  public async clickSignUpWithGoogle() {
    await this.signUpWithGoogle.click();
  }
 

  

  public async waitForHeader(): Promise<void> {
  await signPage.createTelnyxAccount.waitForDisplayed({
    timeout: 5000,
    timeoutMsg: 'Sign-up header did not appear within 5s',
  });
}
  
    
}
export const signUpPage: SignUpPage = new SignUpPage();
