import { CategoryGet } from "./Category";
import { PageObject } from "./Common";

export type ProductPost = {
    name: string;
    categoryId: number | null;
    supplierId: number | null;
    description: string | null;
    salePrice: number;
    status: boolean;
    options: ProductAttributePost[];
}

export type ProductAttributePost = {
    optionName: string;
    values: string[];
}

export type ProductResponse = {
    items: ProductGet[];
    page: PageObject;
}

export type ProductGet = {  
    name: string;
    status: boolean;
    productId: number;
    totalVariant: number;
    totalPreviews: number;
    category: CategoryGet;
    imageUrl: string | null;
    description: string | null;
}