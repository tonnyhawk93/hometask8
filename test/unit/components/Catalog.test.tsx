import { it, expect, describe} from '@jest/globals';
import { FakeApi, FakeCartApi } from './fakeApi/fakeApi';
import React from 'react';
import { render, screen, waitForElementToBeRemoved, waitFor} from '@testing-library/react';
import event from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Catalog } from '../../../src/client/pages/Catalog';
import { ProductDetails } from '../../../src/client/components/ProductDetails';
import { initStore } from '../../../src/client/store';
import { BrowserRouter } from 'react-router-dom';

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
})

