// @ts-check
const { test, expect } = require('@playwright/test');
const { userNames } = require('../fixtures/commonData');
const { locators, pageURLs, isLogin } = require('../pageElements/loginPage');
const formName = 'complex';

test('open complex form from UI', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Complex Form Auth', { exact: true }).click()

    await expect(page.url()).toBe(`${process.env.BASE_URL}${pageURLs.formUrl(formName)}/`);
});

test('success auth via Complex Form', async ({ page }) => {
   await page.goto(pageURLs.formUrl(formName));
   await page.getByLabel('E-Mail Address').fill(userNames.login(formName));
   await page.getByLabel('Password').fill(process.env.PASSWORD);
   await page.getByLabel('Make a Selection').selectOption('Please Log Me In');
   await page.getByLabel('I love form manipulation!').check();

   await page.locator(locators.logIn).click();

   await isLogin(page, pageURLs.successUrl, locators.successText);
   await expect(page.locator(locators.signOut)).toBeVisible();
});
