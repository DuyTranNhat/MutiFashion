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
    items: ProductGet[],
    totalItems: number,
    currentPage: number,
    totalPages: number,
    pageSize: number,
}

export interface ProductGet {
    productId: number;
    name: string;
    description: string | null;
    status: boolean;
    imageUrl: string | null;
    totalVariant: number;
    // category: Category | null;
}