import { it, expect, describe } from '@jest/globals';
import { FakeApi, FakeCartApi } from './fakeApi/fakeApi';
import event from '@testing-library/user-event';
import React from 'react';
import { render, screen, within} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Cart } from '../../../src/client/pages/Cart';
import { Application } from '../../../src/client/Application';
import { initStore } from '../../../src/client/store';
import { Router } from 'react-router';
import {createMemoryHistory} from 'history'

const history = createMemoryHistory();
export interface CartItem {
    name: string;
    price: number;
    count: number;
}

export type CartState = Record<number, CartItem>;

type ProductInfo = {
    name: string;
    price: number;
    count: number;
    priceForAll: number;
}
type ProductsInfo = Record<number, ProductInfo> & {
    totalPrice?: number;
};

function countProductsInfo(products: CartState): ProductsInfo{
    let result: ProductsInfo = {};
    let totalPrice = 0;
    for(let [id, {name, price, count}] of Object.entries(products)) {
        const priceForAll = price * count
        result[+id] = {name, price, count, priceForAll}  
        totalPrice += priceForAll; 
    }
    result.totalPrice = totalPrice;
    return result
}

describe('Корзина', () => {
    it('Для каждого товара должны отображаться название, цена, количество, стоимость, а также должна отображаться общая сумма заказа', () => {
        const api = new FakeApi('test-basename');
        const products: CartState = {
            0: {
                name: 'test-item0',
                price: 100,
                count: 1
            },
            1: {
                name: 'test-item1',
                price: 200,
                count: 2
            }
        } 

        const cartApi = new FakeCartApi(products);
        const store = initStore(api, cartApi);

        const cart = (
            <Router history={history}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </Router>
        );
        const { container, getByTestId } = render(cart);
        const resultProducts: ProductsInfo = {};

        for(let id in products) {
            let product = getByTestId(id);
            const name = product.querySelector('.Cart-Name').textContent;
            const price = +product.querySelector('.Cart-Price').textContent.replace(/\D/, '');
            const count = +product.querySelector('.Cart-Count').textContent;
            const priceForAll = +product.querySelector('.Cart-Total').textContent.replace(/\D/, '');
            resultProducts[id] = {name, price, count, priceForAll};
        }
        resultProducts.totalPrice = +container.querySelector('.Cart-OrderPrice').textContent.replace(/\D/, '');
        expect(resultProducts).toEqual(countProductsInfo(products));
    })

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров', () => {
        const basename = 'test-basename';
        const api = new FakeApi('test-basename');
        const products = {};
        const cartApi = new FakeCartApi(products);
        const store = initStore(api, cartApi);
        const cart = (
            <Router history={history}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </Router>
        );
        const { container, getByRole } = render(cart);
        const linkUri = getByRole('link', {name: /catalog/i}).getAttribute('href');
        expect(linkUri).toEqual(`/catalog`);
    })

    it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', () => {
        const api = new FakeApi('test-basename');
        const products: CartState = {
            0: {
                name: 'test-item0',
                price: 100,
                count: 1
            }
        }
        const cartApi = new FakeCartApi(products);
        const store = initStore(api, cartApi);

        const cart = (
            <Router history={history}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </Router>
        );
        const { container } = render(cart);
        const clearButton = container.querySelector(".Cart-Clear");
        event.click(clearButton);
        const emptyCard = screen.getByText(/cart is empty\. please select products in the \./i)
        expect(emptyCard).toBeTruthy;
    })

    it('В корзине должна отображаться таблица с добавленными в нее товарами', () => {
        const api = new FakeApi('test-basename');
        const products: CartState = {
            0: {
                name: 'test-item0',
                price: 100,
                count: 1
            },
            1: {
                name: 'test-item1',
                price: 200,
                count: 2
            }
        } 

        const cartApi = new FakeCartApi(products);
        const store = initStore(api, cartApi);

        const cart = (
            <Router history={history}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </Router>
        );
        const { getByRole } = render(cart);

        function tableIsExist () {
            const table = getByRole('table');
            for(let id in products) {
               if(!within(table).getByTestId(id)) return false;
            }
            return true;
        }      
        expect(tableIsExist()).toBeTruthy();
    })

    it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () => {
        const api = new FakeApi('test-basename');
        const products: CartState = {
            0: {
                name: 'test-item0',
                price: 100,
                count: 1
            },
            1: {
                name: 'test-item1',
                price: 200,
                count: 2
            }
        } 

        const cartApi = new FakeCartApi(products);
        const store = initStore(api, cartApi);

        const app = (
            <Router history={history}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </Router>
        );
        const { container, getByRole } = render(app);
        const cartLinkNumber = +getByRole('link', {
            name: /cart/i
        }).textContent.replace(/\D/g, '');
        const productsLength = Object.values(products).length;
        expect(cartLinkNumber).toEqual(productsLength);
    })
})

