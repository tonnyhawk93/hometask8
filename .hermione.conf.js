module.exports = {
    baseUrl: 'http://localhost:3000/hw/store/',
    gridUrl: 'http://192.168.100.4:4444/',
    windowSize: "570x800",
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
    },
    screenshotMode: 'fullpage'    
}