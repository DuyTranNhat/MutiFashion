
import { CategoryGet } from "./Category";
import { PageObject } from "./Common";


export type ProductResponse = {
    items: ProductGet[];
    page: PageObject;
}

export type ProductGet = {  
    name: string;
    status: boolean;
    productId: number;
    salePrice: number;
    totalVariant: number;
    totalPreviews: number;
    category: CategoryGet;
    imageUrl: string | null;
    description: string | null;
}