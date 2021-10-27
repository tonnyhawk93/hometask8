import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../../../../src/common/types';
import { ExampleApi } from '../../../../src/client/api'
import {AxiosResponse} from 'axios';


export interface FakeApi {
    products : Product[]
}
export class FakeApi extends ExampleApi{
    constructor(basename : string, products : Product []) {
        super(basename);
        this.products = products;
    }
    async getProducts() {
        const productsShortInfo = this.products.map(product =>  { 
            return {
            id : product.id, 
            name: product.name, 
            price : product.price
        }});     
        return {data: productsShortInfo} as any as Promise<AxiosResponse<ProductShortInfo[]>>;
    }
    async getProductById(id: number) {
        const product = this.products.filter(product => product.id === id);
        return {data: product} as any as Promise<AxiosResponse<Product>>;     
    }
    async checkout(form: CheckoutFormData, cart: CartState) {
        return  {
			data: {
				id: 1
			}
		} as any as Promise<AxiosResponse<CheckoutResponse>>;
    }
}

export interface FakeCartApi {
    cartState: CartState;
}

export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

export class FakeCartApi{
    constructor(cartState : CartState) {
        this.cartState = cartState;
    }
    getState() {
        return this.cartState;
    }
    setState(cartState: CartState) {
        this.cartState = cartState;
        //localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(this.cartState));
    }
}


 