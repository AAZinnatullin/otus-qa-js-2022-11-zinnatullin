// @ts-check
const { test, expect } = require('@playwright/test');
const { pageData, locators, userNames } = require('../controllers/commonData');
const formName = 'simpleForm';


test('open simple form auth page', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Simple Form Auth', { exact: true }).click()

  await expect(page.url()).toBe(`${process.env.BASE_URL}${pageData.formUrl(formName)}/`);
});

test('success auth via Simple Form', async ({ page }) => {
  await page.goto(pageData.formUrl(formName));
  await expect(page).toHaveTitle(/Authentication Test/);

  await page.getByLabel('E-Mail Address').fill(userNames.login(formName));
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await locators.login.clickLogin(page);

  await pageData.isLogin(page, locators.login.successUrl, locators.login.successText);
  await expect(page.locator(locators.login.signOut)).toBeVisible();
});

test('fail auth via Simple Form with wrong user name', async ({ page }) => {
  await page.goto(pageData.formUrl(formName));

  await page.getByLabel('E-Mail Address').fill('test@google.com');
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator('//input[@value="Log In"]').click();

  await pageData.isLogin(page, locators.login.failUrl, locators.login.failText);
  await expect(page.locator(locators.login.signOut)).not.toBeVisible();
});

test('fail auth via Simple Form with wrong password', async ({ page }) => {
  await page.goto(pageData.formUrl(formName));

  await page.getByLabel('E-Mail Address').fill(userNames.login(formName));
  await page.getByLabel('Password').fill('Password');
  await page.locator('//input[@value="Log In"]').click();

  await pageData.isLogin(page, locators.login.failUrl, locators.login.failText);
  await expect(page.locator(locators.login.signOut)).not.toBeVisible();
});

test('fail auth via Simple Form without password and user name', async ({ page }) => {
  await page.goto(pageData.formUrl(formName));

  await page.locator('//input[@value="Log In"]').click();

  await pageData.isLogin(page, locators.login.failUrl, locators.login.failText);
  await expect(page.locator(locators.login.signOut)).not.toBeVisible();
});
