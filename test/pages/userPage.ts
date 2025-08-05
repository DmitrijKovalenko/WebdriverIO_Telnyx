import { ChainablePromiseElement } from 'webdriverio';
class UserPage {

    public get welcomeText(): ChainablePromiseElement {
        return $('span[data-testid="welcome-message"]');
}
    public get accountDropdown() {
        return $('.MuiBox-root.frontend-customer-portal-0');
    }
    public async clickAccountDropdown() {
        await this.accountDropdown.click();
    }
    public get darkModeSwitch() {
    return $('input.MuiSwitch-input');
    }
    public async clickDarkModeSwitch() {
        await this.darkModeSwitch.click();
    }

    public get signOut() {
        return $("//span[text()='Sign Out']");
    }
    public async clickSignOut() {
        await this.signOut.click();
    }
    
}

export const userPage: UserPage = new UserPage();