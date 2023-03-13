// @ts-check
const { test, expect } = require('@playwright/test');
const { pageData, locators, userNames } = require('../fixtures/commonData');
const formName = 'bootstrap';

test('open bootstrap form from UI', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Interactive Auth', { exact: true }).click()

    await expect(page.url()).toBe(`${process.env.BASE_URL}${pageData.formUrl(formName)}/`);
});

test('success auth via Interactive Form', async ({ page }) => {
    await page.goto(pageData.formUrl(formName));
    await page.getByLabel('E-Mail Address').fill(userNames.login(formName));
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    const code = await page.locator('//label/code').innerText();
    await page.locator('//input[@id="captcha"]').fill(code);

    await locators.login.clickLogin(page);

    await pageData.isLogin(page, locators.login.successUrl, locators.login.successText);
    await expect(page.locator(locators.login.signOut)).toBeVisible();
});
