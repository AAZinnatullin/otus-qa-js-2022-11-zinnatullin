// @ts-check
const { test, expect } = require('@playwright/test');
const { pageData, locators, userNames } = require('../fixtures/commonData');
const formName = 'complex';

test('open complex form from UI', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Complex Form Auth', { exact: true }).click()

    await expect(page.url()).toBe(`${process.env.BASE_URL}${pageData.formUrl(formName)}/`);
});

test('success auth via Complex Form', async ({ page }) => {
   await page.goto(pageData.formUrl(formName));
   await page.getByLabel('E-Mail Address').fill(userNames.login(formName));
   await page.getByLabel('Password').fill(process.env.PASSWORD);
   await page.getByLabel('Make a Selection').selectOption('Please Log Me In');
   await page.getByLabel('I love form manipulation!').check();

   await locators.login.clickLogin(page);

   await pageData.isLogin(page, locators.login.successUrl, locators.login.successText);
   await expect(page.locator(locators.login.signOut)).toBeVisible();
});

