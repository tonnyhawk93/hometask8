import { ExampleApi, CartApi } from '../../../../src/client/api';
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../../../../src/common/types';
import mockAxios from 'jest-mock-axios';

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
export class FakeApi extends ExampleApi{
    constructor(basename: string) {
        super(basename);
    }
    
    async getProducts() {
        const productsShortInfo = products.map(product =>  {product.id, product.name, product.price});
        return mockAxios.mockResponse({data: productsShortInfo});
    }

    async getProductById(id: number) {
        const product = products.filter(product => product.id === id);
        return mockAxios.mockResponse({data: product});     
    }
}

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


 