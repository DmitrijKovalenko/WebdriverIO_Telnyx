import { mainPage } from '../pages/mainPage';
import { acceptCookieBannerIfVisible } from '../helpers/interactionUtils'; 

describe('Social tests', () => {
 beforeEach(async () => {
     await browser.reloadSession();
     await browser.url('https://telnyx.com/');
     await browser.maximizeWindow();
     await acceptCookieBannerIfVisible();

 });
    
    it('should open the LinkedIn link in a new tab', async () => {
        await mainPage.linkedIn.scrollIntoView();
        await mainPage.linkedInClick();
        const handles = await browser.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);
        await browser.switchToWindow(handles[handles.length - 1]);
        await browser.waitUntil(async () => {
        const url = await browser.getUrl();
        return url.includes('linkedin');}, {
        timeout: 5000,
        timeoutMsg: 'LinkedIn page did not load'
        });
        });
    
    it('should open the Facebook link in a new tab', async () => {
    await mainPage.facebookLink.scrollIntoView();
    await mainPage.facebookLinkClick();
    const handles = await browser.getWindowHandles();
    expect(handles.length).toBeGreaterThan(1);
    await browser.switchToWindow(handles[handles.length - 1]);
    await browser.waitUntil(async () => {
        const url = await browser.getUrl();
        return url.includes('facebook.com/Telnyx');
    }, {
        timeout: 5000,
        timeoutMsg: 'Facebook page did not load'
    });
});
    

    it('should open the X (Twitter) link in a new tab', async () => {
    await mainPage.twitterLink.scrollIntoView();
    await mainPage.twitterLinkClick();
    const handles = await browser.getWindowHandles();
    expect(handles.length).toBeGreaterThan(1);
    await browser.switchToWindow(handles[handles.length - 1]);
    await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    return url.includes('twitter.com/telnyx') || url.includes('x.com/telnyx');
    }, {
        timeout: 5000,
        timeoutMsg: 'X (Twitter) page did not load'
    });
 });
    
     });