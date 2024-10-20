export type ProductPost = {
    name: string;
    categoryId: number | null;
    supplierId: number | null;
    description: string | null;
    status: boolean;
    options: ProductAttributePost[];
}

export type ProductAttributePost = {
    optionName: string;
    values: string[];
}

