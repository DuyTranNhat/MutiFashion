import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { ProductPost } from "../Models/Product";
import { PRODUCT_API } from "../Utils/constant";

export const productPostAPI = async (productPost: ProductPost) => {
    try {
        const data = await axios.post<ProductPost>(`${PRODUCT_API}/create`, productPost);
        return data;
    } catch (error) {
        handleError(error)
    }
}