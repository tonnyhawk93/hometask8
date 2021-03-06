import { it, expect, describe, jest} from '@jest/globals';
import { FakeApi, FakeCartApi } from './fakeApi/fakeApi';
import { ExampleApi ,CartApi } from '../../../src/client/api';
import React from 'react';
import { render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import event from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Catalog } from '../../../src/client/pages/Catalog';
import { ProductDetails } from '../../../src/client/components/ProductDetails';
import { Cart } from '../../../src/client/pages/Cart';
import { initStore } from '../../../src/client/store';
import { BrowserRouter } from 'react-router-dom';
import { Product as ProductType } from '../../../src/common/types';
import {Application} from '../../../src/client/Application';

describe('Каталог', () => {
    it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
        const products = [
            {
                id: 0,
                name: 'Tasty Pants',
                description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
                price: 302,
                color: 'Purple',
                material: 'Metal',
            },
            {
                id: 1,
                name: 'Tasty Towels',
                description: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
                price: 614,
                color: 'Red',
                material: 'Soft',
            },
            {
                id: 2,
                name: 'Handcrafted Computer',
                description: 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
                price: 131,
                color: 'Ivory',
                material: 'Rubber',
            },
            {
                id: 3,
                name: 'Licensed Shirt',
                description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
                price: 78,
                color: 'Teal',
                material: 'Frozen',
            },
            {
                id: 4,
                name: 'Handcrafted Mouse',
                description: 'The Football Is Good For Training And Recreational Purposes',
                price: 225,
                color: 'Pink',
                material: 'Steel',
            },
        ]
        const api = new FakeApi('test-basename', products);
        const cartApi = new FakeCartApi({});
        const store = initStore(api, cartApi);

        const catalog = (
            <BrowserRouter>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );
        const { getAllByTestId } = render(catalog);
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

        for(let product of products) {
            getAllByTestId(product.id)
        }
    })

    it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const products = [
            {
                id: 0,
                name: 'Tasty Pants',
                description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
                price: 302,
                color: 'Purple',
                material: 'Metal',
            }
        ]
        const api = new FakeApi('test-basename', products);
        const cartApi = new FakeCartApi({});
        const store = initStore(api, cartApi);

        const catalog = (
            <BrowserRouter>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );
        const { getAllByTestId } = render(catalog);
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
        expect(screen.getByText('Tasty Pants')).toBeTruthy();
        expect(screen.getByText('$302')).toBeTruthy();
        expect(screen.getByText(/details/i).getAttribute('href')).toEqual('/catalog/0')
    })
    
    it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => {
        const products = [
            {
                id: 0,
                name: 'Tasty Pants',
                description: 'test-descr',
                price: 302,
                color: 'Purple',
                material: 'Metal',
            }
        ]
        const api = new FakeApi('test-basename', products);
        const cartApi = new FakeCartApi({});
        const store = initStore(api, cartApi);
        const catalog = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductDetails product = {products[0]}/>
                </Provider>
            </BrowserRouter>
        );
        const { container } = render(catalog);
        expect(screen.getByText('Tasty Pants')).toBeTruthy();
        expect(screen.getByText('$302')).toBeTruthy();
        expect(screen.getByText('test-descr')).toBeTruthy();
        expect(screen.getByText('Purple')).toBeTruthy();
        expect(screen.getByText('Metal')).toBeTruthy();
        expect(screen.getByRole('button', { name: /add to cart/i })).toBeTruthy();
    })

    it('Eсли товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
        const products = [
            {
                id: 0,
                name: 'Tasty Pants',
                description: 'test-descr',
                price: 302,
                color: 'Purple',
                material: 'Metal',
            }
        ]
        const api = new FakeApi('test-basename', products);
        const cartApi = new CartApi();
        const store = initStore(api, cartApi);
        function getProductFromCart(product : ProductType) {
            const {cart} = store.getState()
            return cart[product.id]
        }
        const productDetails = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductDetails product = {products[0]}/>
                </Provider>
            </BrowserRouter>
        );
        const { getByText } = render(productDetails);
        getByText('Add to Cart').click()
        expect(getProductFromCart(products[0]).count).toEqual(1)
        getByText('Item in cart')
        getByText('Add to Cart').click()
        expect(getProductFromCart(products[0]).count).toEqual(2)
    })

    // it('Eсли товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом', async () => {
    //     const products = [
    //         {
    //             id: 0,
    //             name: 'Tasty Pants',
    //             description: 'test-descr',
    //             price: 302,
    //             color: 'Purple',
    //             material: 'Metal',
    //         }
    //     ]
    //     const api = new FakeApi('test-basename', products);
    //     const cartApi = new CartApi();
    //     const store = initStore(api, cartApi);
    //     const productDetails = (
    //         <BrowserRouter>
    //             <Provider store={store}>
    //                 <ProductDetails product = {products[0]}/>
    //                 <Catalog/>
    //             </Provider>
    //         </BrowserRouter>
    //     );
    //     const { getByText } = render(productDetails);
    //     getByText('Add to Cart').click()
    //     await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    //     expect(screen.queryAllByText('Item in cart').length).toEqual(2);
    // })

    it('Cодержимое корзины должно сохраняться между перезагрузками страницы', async () => {
        const products = [
            {
                id: 0,
                name: 'Tasty Pants',
                description: 'test-descr',
                price: 302,
                color: 'Purple',
                material: 'Metal',
            }
        ]
        const api = new FakeApi('test-basename', products);
        const cartApi = new FakeCartApi({
            0: {
                name: 'Tasty Pants',
                price: 302,
                count: 1
            }
        });
        const store = initStore(api, cartApi);
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn()
            }
        })

        const cart = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        );
        const {getAllByText} = render(cart);
        expect(getAllByText('Tasty Pants')).toBeTruthy();

        const productDetails = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductDetails product = {products[0]}/>
                </Provider>
            </BrowserRouter>
        );
        const {getByText} = render(productDetails);
        getByText('Add to Cart').click()
        expect(localStorage.setItem).toBeCalled();
    })

    it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function() {
        const api = new ExampleApi('test-basename');
        const cartApi = new CartApi();
        const store = initStore(api, cartApi);
        const productDetails = (
            <BrowserRouter>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </BrowserRouter>
        );
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 575,
          })
        const tree = render(productDetails);
        expect(tree).toMatchSnapshot()
    });
})



	
