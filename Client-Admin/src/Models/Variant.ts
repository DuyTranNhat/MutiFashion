export type ProductResponse = {
    items: VariantGet[],
    totalItems: number,
    currentPage: number,
    totalPages: number,
    pageSize: number,
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