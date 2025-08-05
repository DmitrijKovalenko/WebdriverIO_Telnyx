class SignInPage {
    
    public get createTelnyxAccount() {
        return $("//h1[text()='Create a Telnyx account']");
    }
    public async waitForHeader(): Promise<void> {
  await this.createTelnyxAccount.waitForDisplayed({ timeout: 5000 });
}
   
    public get cookieClose() {
        return $('#onetrust-close-btn-container > button.onetrust-close-btn-handler')
    }
    public async cookieCloseClick() {
        await this.cookieClose.click();
    }

}




export const signPage: SignInPage = new SignInPage();