import { ExampleApi, CartApi } from '../../../../src/client/api';

export class FakeApi extends ExampleApi{
    constructor(basename: string) {
        super(basename);
    }
}

export interface CartItem {
    name: string;
    price: number;
    count: number;
}

export type CartState = Record<number, CartItem>;

export interface FakeCartApi {
    cartState: CartState;
}

export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

export class FakeCartApi extends CartApi {
    constructor(cartState : CartState) {
        super();
        this.cartState = cartState;
    }
    getState() {
        return this.cartState;
    }
    setState(cartState: CartState) {
        this.cartState = cartState;
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(this.cartState));
    }
}


 