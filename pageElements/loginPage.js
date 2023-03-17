import {expect} from "@playwright/test";

const pageURLs = {
    formUrl: (formName) => {
        return `/${formName}Auth`
    },
    successUrl: `${process.env.BASE_URL}/loginSuccess/`,
    failUrl: `${process.env.BASE_URL}/loginFail/`,
};

const locators = {
    successText: 'Login Success',
    failText: 'Login Failure',
    signOut: `//a[@href="${process.env.BASE_URL}/login/?mode=logout"]`,
    logIn: '//input[@value="Log In"]',
};

const isLogin = async function checkIsLoginSuccess (page, url, text) {
    await expect(page.url()).toBe(url);
    await expect(page.getByText(text)).toBeVisible();
};

export { locators, pageURLs, isLogin };
