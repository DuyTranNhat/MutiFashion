import { PageObject } from "./Common";
export type CategoryResponse = {
    items: CategoryGet[];
    page: PageObject;
}

export type CategoryGet = {
    categoryId: number;
    name: string;
    quantity: number;
    activeStatus: boolean;
    totalProduct: number;
}
