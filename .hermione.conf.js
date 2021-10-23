module.exports = {
    baseUrl: 'https://shri.yandex/hw/store',
    gridUrl: 'http://192.168.100.5:4444',
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