import { PageObject } from "./Common";

export type VariantResponse = {
    items: VariantGet[];
    page: PageObject;
}

export type FilterVariantPost = {
    skuId?: string | null;
    categoryID?: number | null;
    supplierID?: number | null;
    keyWord?: string | null;
    fromPrice?: number| null;
    toPrice?: number | null;
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

export type VariantValueGet = {
    valueId: number;
    value: string;
    attributeID: number;
    attributeName: string;
}

export type VariantImageGet = {
    imageId: number;
    variantId: number;
    imageUrl: string;
}

export type ImageGet = {
    imageId: number;
    variantId: number;
    imageUrl: string;
  }
  
export type VariantUpdateDto = {
    name: string;
    status: boolean;
    description: string | null;
}