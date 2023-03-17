const userNames = {
    login: (formName) => {
        return `${formName}${process.env.USER_NAME}`;
    },
};

export { userNames };
