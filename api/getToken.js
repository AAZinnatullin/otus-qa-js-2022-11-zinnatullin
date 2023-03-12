const totpToken = {
    encodedRespBody: async (page, token) => {
        const response = await page.request.post('/totp/', {
            data: `secret=${token}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
        const body = await response.body();
        let decoder = new TextDecoder(['utf-8']);
        let encodedResp = decoder.decode(body);
        encodedResp = JSON.parse(encodedResp);
        return encodedResp;
    },
};

export { totpToken };
