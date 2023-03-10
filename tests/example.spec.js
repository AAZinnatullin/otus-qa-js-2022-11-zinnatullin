// @ts-check
const { test, expect } = require('@playwright/test');

const pages = {
  simpleForm: '/simpleFormAuth',
  loginSuccess: `${process.env.BASE_URL}/loginSuccess/`,
  loginFail: `${process.env.BASE_URL}/loginFail/`,
};

const userNames = {
  simpleForm: `simpleForm${process.env.USER_NAME}`,
};

const locators = {
  login: {
    successUrl: pages.loginSuccess,
    successText: 'Login Success',
    failUrl: pages.loginFail,
    failText: 'Login Failure',
    signOut: `//a[@href="${process.env.BASE_URL}/login/?mode=logout"]`,
  },
};

async function checkIsLoginSuccess (page, url, text) {
  await expect(page.url()).toBe(url);
  await expect(page.getByText(text)).toBeVisible();
}

test('open simple form auth page', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Simple Form Auth', { exact: true }).click()

  await expect(page.url()).toBe(`${process.env.BASE_URL}${pages.simpleForm}/`);
});

test('success auth via Simple Form', async ({ page }) => {
  await page.goto(pages.simpleForm);
  await expect(page).toHaveTitle(/Authentication Test/);

  await page.getByLabel('E-Mail Address').fill(userNames.simpleForm);
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator('//input[@value="Log In"]').click();

  await checkIsLoginSuccess(page, locators.login.successUrl, locators.login.successText);
  await expect(page.locator(locators.login.signOut)).toBeVisible();
});

test('fail auth via Simple Form with wrong user name', async ({ page }) => {
  await page.goto(pages.simpleForm);

  await page.getByLabel('E-Mail Address').fill('test@google.com');
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator('//input[@value="Log In"]').click();

  await checkIsLoginSuccess(page, locators.login.failUrl, locators.login.failText);
  await expect(page.locator(locators.login.signOut)).not.toBeVisible();
});

test('fail auth via Simple Form with wrong password', async ({ page }) => {
  await page.goto(pages.simpleForm);

  await page.getByLabel('E-Mail Address').fill(userNames.simpleForm);
  await page.getByLabel('Password').fill('Password');
  await page.locator('//input[@value="Log In"]').click();

  await checkIsLoginSuccess(page, locators.login.failUrl, locators.login.failText);
  await expect(page.locator(locators.login.signOut)).not.toBeVisible();
});

test('fail auth via Simple Form without password and user name', async ({ page }) => {
  await page.goto(pages.simpleForm);

  await page.locator('//input[@value="Log In"]').click();

  await checkIsLoginSuccess(page, locators.login.failUrl, locators.login.failText);
  await expect(page.locator(locators.login.signOut)).not.toBeVisible();
});
