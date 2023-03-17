// @ts-check
const { test, expect } = require('@playwright/test');
const { totpToken } = require('../api/getToken');
const { locators, pageURLs, isLogin } = require('../pageElements/loginPage');
const formName = 'totpChallenge';

test('open TOTP form from UI', async ({ page }) => {
    await page.goto('/');
    await page.getByText('TOTP MFA Challenge', { exact: true }).click()

    await expect(page.url()).toBe(`${process.env.BASE_URL}/${formName}/`);
});

test('auth via TOTP form', async ({ page }) => {
    await page.goto(`/${formName}`);
    const token = await page.locator('//strong[contains(., "Secret")]').innerText();
    const code = await totpToken.encodedRespBody(page, token.substring(8));

    await page.getByLabel('E-Mail Address').fill('totp@authenticationtest.com');
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    await page.getByLabel('Enter your MFA Code:').fill(code.code);

    await page.locator(locators.logIn).click();

    await isLogin(page, pageURLs.successUrl, locators.successText);
    await expect(page.locator(locators.signOut)).toBeVisible();
});
