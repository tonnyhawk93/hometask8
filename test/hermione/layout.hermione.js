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
    

    it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function() {
        const browser = this.browser;
        await browser.url('/hw/store');
        const page = await browser.$('.Application');
        await page.waitForExist();
        await browser.assertView('hamburger', '.Application', {
            allowViewportOverflow: true
        });
    });
})
