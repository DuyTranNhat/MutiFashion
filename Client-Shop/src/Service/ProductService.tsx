import axios from "axios";
import { ProductGet, ProductResponse, ProductSearchPost } from "../Model/Product";
import { handleError } from "../Helpers/ErrorHandler";
import { PRODUCT_API } from "../Utils/constant";

export const ProductGetAPI = async (page: number = 1, limit: number = 12) => {
    try {
        const data = await axios.get<ProductResponse>(`${PRODUCT_API}/getProducts`, {
            params: {
                page: page,
                limit: limit,
            },
        });
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const ProductSearchAPI = async (productSearch: ProductSearchPost) => {
    try {
        const data = await axios.post<ProductGet[]>(`${PRODUCT_API}/search/`, productSearch);
        return data;
    } catch (error) {
        handleError(error)
    }
}