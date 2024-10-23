import axios from "axios";
import { ProductResponse } from "../Model/Product";
import { handleError } from "../Helpers/ErrorHandler";
import { PRODUCT_API } from "../Utils/constant";

export const ProductGetAPI = async (page: number = 1, litmit: number = 12) => {
    try {
        const data = await axios.get<ProductResponse>(`${PRODUCT_API}/getProducts`, {
            params : {
                page: page,
                limit: litmit,
            },
        });
        return data;
    } catch (error) {
        handleError(error)
    }
}