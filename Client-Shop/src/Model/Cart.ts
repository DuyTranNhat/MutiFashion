import { PageObject } from "./Common";
import { VariantGet } from "./Variant"

export type CartPost = {
    customerId: number,
    variantId: number,
    quantity: number,
}

export interface CartGet {
    cartId: number;
    customerId: number;
    variant: VariantGet;
    quantity: number;
    totalPrice: number;
    dateAdded: string;
}

export type CartReponse = {
    items: CartGet[];
    page: PageObject;
}