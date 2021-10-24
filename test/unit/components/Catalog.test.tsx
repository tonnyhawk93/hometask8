import { it, expect, describe} from '@jest/globals';
import { FakeApi, FakeCartApi } from './fakeApi/fakeApi';
import event from '@testing-library/user-event';
import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Catalog } from '../../../src/client/pages/Catalog';
import { initStore } from '../../../src/client/store';
import { Router } from 'react-router';
import {createMemoryHistory} from 'history'

const history = createMemoryHistory();

describe('Каталог', () => {
    it('В каталоге должны отображаться товары, список которых приходит с сервера', async (done) => {
        const api = new FakeApi('test-basename');
        const products = {};
        const cartApi = new FakeCartApi(products);
        const store = initStore(api, cartApi);

        const catalog = (
            <Router history={history}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </Router>
        );
        const { container, getByTestId } = render(catalog);           
    })
})

