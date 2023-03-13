// @ts-check
const { test } = require('@playwright/test');
const { pageData, locators } = require('../controllers/commonData');

test.use({ extraHTTPHeaders: {
    Authorization: 'Basic dXNlcjpwYXNz'
    } });

test('basic auth with auth header', async ({ page }) => {
    await page.goto('/')
    await page.getByText('HTTP/NTLM Auth', { exact: true }).click();

    await pageData.isLogin(page, locators.login.successUrl, locators.login.successText);
})
