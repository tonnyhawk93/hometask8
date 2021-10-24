module.exports = {
    baseUrl: 'https://shri.yandex/hw/store',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    plugins: {
        'html-reporter/hermione': {
            path: './test/hermione/screens'
        }
    }
}