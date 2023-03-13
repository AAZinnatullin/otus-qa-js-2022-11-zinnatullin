import {expect} from "@playwright/test";

const pageData = {
    formUrl: (formName) => {
        return `/${formName}Auth`
    },
    loginSuccess: `${process.env.BASE_URL}/loginSuccess/`,
    loginFail: `${process.env.BASE_URL}/loginFail/`,
    isLogin: async function checkIsLoginSuccess (page, url, text) {
        await expect(page.url()).toBe(url);
        await expect(page.getByText(text)).toBeVisible();
    },
};

const locators = {
    login: {
        successUrl: pageData.loginSuccess,
        successText: 'Login Success',
        failUrl: pageData.loginFail,
        failText: 'Login Failure',
        signOut: `//a[@href="${process.env.BASE_URL}/login/?mode=logout"]`,
        clickLogin: async (page) => {
            await page.locator('//input[@value="Log In"]').click();
        },
    },
};

const userNames = {
    login: (formName) => {
        return `${formName}${process.env.USER_NAME}`;
    },
};

export { pageData, locators, userNames };
