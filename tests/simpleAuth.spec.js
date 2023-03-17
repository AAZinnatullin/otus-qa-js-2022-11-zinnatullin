// @ts-check
const { test, expect } = require('@playwright/test');
const { userNames } = require('../fixtures/commonData');
const { locators, pageURLs, isLogin } = require('../pageElements/loginPage');
const formName = 'simpleForm';


test('open simple form auth page', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Simple Form Auth', { exact: true }).click()

  await expect(page.url()).toBe(`${process.env.BASE_URL}${pageURLs.formUrl(formName)}/`);
});

test('success auth via Simple Form', async ({ page }) => {
  await page.goto(pageURLs.formUrl(formName));
  await expect(page).toHaveTitle(/Authentication Test/);

  await page.getByLabel('E-Mail Address').fill(userNames.login(formName));
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator(locators.logIn).click();

  await isLogin(page, pageURLs.successUrl, locators.successText);
  await expect(page.locator(locators.signOut)).toBeVisible();
});

test('fail auth via Simple Form with wrong user name', async ({ page }) => {
  await page.goto(pageURLs.formUrl(formName));

  await page.getByLabel('E-Mail Address').fill('test@google.com');
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator('//input[@value="Log In"]').click();

  await isLogin(page, pageURLs.failUrl, locators.failText);
  await expect(page.locator(locators.signOut)).not.toBeVisible();
});

test('fail auth via Simple Form with wrong password', async ({ page }) => {
  await page.goto(pageURLs.formUrl(formName));

  await page.getByLabel('E-Mail Address').fill(userNames.login(formName));
  await page.getByLabel('Password').fill('Password');
  await page.locator('//input[@value="Log In"]').click();

  await isLogin(page, pageURLs.failUrl, locators.failText);
  await expect(page.locator(locators.signOut)).not.toBeVisible();
});

test('fail auth via Simple Form without password and user name', async ({ page }) => {
  await page.goto(pageURLs.formUrl(formName));

  await page.locator('//input[@value="Log In"]').click();

  await isLogin(page, pageURLs.failUrl, locators.failText);
  await expect(page.locator(locators.signOut)).not.toBeVisible();
});
