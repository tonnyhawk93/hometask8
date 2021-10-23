import { it, expect, describe } from '@jest/globals';
import React from 'react';
import { ProductItem } from '../../../src/client/components/ProductItem';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ExampleApi, CartApi } from '../../../src/client/api';
import { initStore } from '../../../src/client/store';

const api = new ExampleApi('');
const cart = new CartApi();
const store = initStore(api, cart);

describe('Карточка товара', () => {
    it('Карточка товара правильно отображает принимаемые данные', () => {
        const productInput = {
            id: 1,
            name: 'test-name',
            price: 999
        }
        let productOutput = {
            id: 0,
            name: '',
            price: 0
        };

        const productItem = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductItem product={productInput} />
                </Provider>
            </BrowserRouter>
        )
        const { container, getByTestId } = render(productItem);
        productOutput.id = Number(getByTestId(productInput.id).getAttribute('data-testid'));
        productOutput.name = container.querySelector('.ProductItem-Name').textContent;
        productOutput.price = +container.querySelector('.ProductItem-Price').textContent.replace(/\D+/, '');
        expect(productInput).toEqual(productOutput);
    })
})




