// @ts-check
const { test } = require('@playwright/test');
const { locators, pageURLs,isLogin } = require('../pageElements/loginPage');

test.use({ extraHTTPHeaders: {
    Authorization: 'Basic dXNlcjpwYXNz'
    } });

test('basic auth with auth header', async ({ page }) => {
    await page.goto('/')
    await page.getByText('HTTP/NTLM Auth', { exact: true }).click();

    await isLogin(page, pageURLs.successUrl, locators.successText);
})
