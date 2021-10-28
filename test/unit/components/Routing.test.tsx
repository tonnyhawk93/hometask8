import { it, expect, describe } from '@jest/globals';
import event from '@testing-library/user-event';
import React from 'react';
import { render, screen} from '@testing-library/react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ExampleApi, CartApi } from '../../../src/client/api';
import { initStore } from '../../../src/client/store';
import {Application} from '../../../src/client/Application';
import {createMemoryHistory} from 'history'

const basename = '/hw/store';

const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);
const history = createMemoryHistory({
    initialEntries: [basename]    
})

describe('Роутинг', () => {
    it('При клику на ссылки открываются страницы', () => {
        const application = (
            <Router history={history}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </Router>
        );
        render(application);
        event.click(screen.getByRole('link', { name: /catalog/i }));
        expect(screen.getByRole('heading', { name: /catalog/i }).textContent).toEqual('Catalog');
        event.click(screen.getByRole('link', { name: /delivery/i }));
        expect(screen.getByRole('heading', { name: /delivery/i }).textContent).toEqual('Delivery');
        event.click(screen.getByRole('link', { name: /contacts/i }));
        expect(screen.getByRole('heading', { name: /contacts/i }).textContent).toEqual('Contacts');
        event.click(screen.getByRole('link', { name: /cart/i }));
        expect(screen.getByRole('heading', { name: /cart/i }).textContent).toEqual('Shopping cart');
        event.click(screen.getByRole('link', { name: /example store/i }));
        expect(screen.getByText(/welcome to example store!/i)).toBeTruthy();
    })
})



