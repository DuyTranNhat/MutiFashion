import { PageObject } from "./Common";

export type VariantResponse = {
    items: VariantGet[];
    page: PageObject;
}

export type VariantGet = {
    skuId: string;
    status: boolean;
    quantity: number;
    variantId: number;
    productId: number;
    salePrice: number;
    baseImage: string;
    productName: string;
    images: VariantImageGet[];
    variantValues: VariantValueGet[];
}

export type VariantImageGet = {
    imageId: number;
    variantId: number;
    imageUrl: string;
}

export type VariantValueGet = {
    valueId: number;
    value: string;
    attributeID: number;
    attributeName: string;
}