const { delay } = require("rxjs");

describe('Проверка вёрстки страниц', async function() {
    it('Проверка вёрстки главной страницы', async function() {
        const browser = this.browser;
        await browser.url('/hw/store');
        const page = await browser.$('.Application');
        await page.waitForExist();
        await browser.assertView('mainPage', '.Application', {
            allowViewportOverflow: true
        });
    });

    it('Проверка вёрстки страницы Delivery', async function() {
        const browser = this.browser;
        await browser.url('/hw/store/delivery');
        const page = await browser.$('.Application');
        await page.waitForExist();
        await browser.assertView('deliveryPage', '.Application', {
            allowViewportOverflow: true
        });
    });
    it('Проверка вёрстки страницы Сontacts', async function() {
        const browser = this.browser;
        await browser.url('/hw/store/contacts');
        const page = await browser.$('.Application');
        await page.waitForExist();
        await browser.assertView('contactsPage','.Application', {
            allowViewportOverflow: true
        });
    });
    it('Проверка вёрстки страницы Shopping cart', async function() {
        const browser = this.browser;
        await browser.url('/hw/store/cart');
        const page = await browser.$('.Application');
        await page.waitForExist();
        await browser.assertView('emptyCartPage', '.Application', {
            allowViewportOverflow: true
        });
    });
    it('Можно сделать заказ', async function() {
        const browser = this.browser;
        await browser.url('/hw/store/catalog/0');
        const button = await browser.$('.ProductDetails-AddToCart');
        await button.waitForExist();
        button.click();
        await browser.$('.nav-link:nth-child(4)').click();
        await browser.$('#f-name').setValue('test-name');
        await browser.$('#f-phone').setValue('4235234523452345');
        await browser.$('#f-address').setValue('sfgsfgsfgsfdsf');
        await browser.$('.Form-Submit').click();
        delay(5000)
        await browser.assertView('orderPage', '.Application', {
            allowViewportOverflow: true
        });
    });
    
})
