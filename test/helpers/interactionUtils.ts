export async function acceptCookieBannerIfVisible() {
  const consent = await $('.onetrust-banner-options #onetrust-accept-btn-handler');
  if (await consent.isExisting() && await consent.isDisplayed()) {
    await consent.click();
    await browser.waitUntil(
      async () => !(await consent.isDisplayed()),
      { timeout: 3000, timeoutMsg: 'Cookie banner did not disappear' }
    );
  }
}

export async function acceptCookieBannerIfVisible2() {
  try {
    const cookieBannerAcceptBtn = await $('#accept-cookie-btn');

    // Почекаємо трохи на появу DOM-елемента
    await browser.pause(500); // можеш прибрати, якщо не треба

    const isExisting = await cookieBannerAcceptBtn.isExisting();
    const isDisplayed = await cookieBannerAcceptBtn.isDisplayed();

    if (isExisting && isDisplayed) {
      await cookieBannerAcceptBtn.waitForDisplayed({ timeout: 5000 }); // Перевірка видимості
      await cookieBannerAcceptBtn.waitForClickable({ timeout: 5000 }); // Перевірка клікабельності

      await cookieBannerAcceptBtn.click();
      console.log('✅ Cookie banner was accepted.');
    } else {
      console.log('ℹ️ Cookie banner not displayed.');
    }

  } catch (error) {
    console.warn('⚠️ Cookie banner could not be interacted with:');
  }
}

