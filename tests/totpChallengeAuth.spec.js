// @ts-check
const { test, expect } = require('@playwright/test');
const { pageData, locators} = require('../fixtures/commonData');
const { totpToken } = require('../api/getToken');
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

    await locators.login.clickLogin(page);

    await pageData.isLogin(page, locators.login.successUrl, locators.login.successText);
    await expect(page.locator(locators.login.signOut)).toBeVisible();
});
