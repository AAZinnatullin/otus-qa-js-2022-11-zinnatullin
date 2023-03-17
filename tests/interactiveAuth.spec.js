// @ts-check
const { test, expect } = require('@playwright/test');
const { userNames } = require('../fixtures/commonData');
const { locators, pageURLs, isLogin } = require('../pageElements/loginPage');
const formName = 'bootstrap';

test('open bootstrap form from UI', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Interactive Auth', { exact: true }).click()

    await expect(page.url()).toBe(`${process.env.BASE_URL}${pageURLs.formUrl(formName)}/`);
});

test('success auth via Interactive Form', async ({ page }) => {
    await page.goto(pageURLs.formUrl(formName));
    await page.getByLabel('E-Mail Address').fill(userNames.login(formName));
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    const code = await page.locator('//label/code').innerText();
    await page.locator('//input[@id="captcha"]').fill(code);

    await page.locator(locators.logIn).click();

    await isLogin(page, pageURLs.successUrl, locators.successText);
    await expect(page.locator(locators.signOut)).toBeVisible();
});
