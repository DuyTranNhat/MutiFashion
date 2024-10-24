
import { ValueGet } from "./Attribute";
import { CategoryGet } from "./Category";
import { PageObject } from "./Common";
import { VariantGet } from "./Variant";


export type ProductResponse = {
    items: ProductGet[];
    page: PageObject;
}

export interface ProductVariantGet {
    name: string;
    imageUrl: string
    ImageUrl: string;
    productId: number;
    totalPreviews: number;
    variants: VariantGet[];
    description: string | null;
    categoryDto: CategoryGet | null;
    attributes: ProductOptionsGet[];
}

export type ProductGet = {
    status: boolean;
    productId: number;
    imageUrl: string | null;
    salePrice: number | null;
    description: string | null;
    name: string;
    totalVariant: number;
    totalPreviews: number;
    category: CategoryGet | null;
    productOptions: ProductOptionsGet[];
}

export type ProductSearchPost = {
    key?: string;
}

export type ProductOptionsGet = {
    attributeID: number;
    attributeName: string;
    values: ValueGet[];
}