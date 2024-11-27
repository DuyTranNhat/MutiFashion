import axios from "axios";
import { CategoryGet, CategoryResponse } from "../Model/Category";
import { CATEGORY_API } from "../Utils/constant";
import { handleError } from "../Helpers/ErrorHandler";

export const categoryGetAPI = async (page: number = 1, limit: number = 100) => {
    try {
        const data = await axios.get<CategoryResponse>(`${CATEGORY_API}/getCategories`, {
            params: {
                page: page,
                limit: limit,
            },
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const categoryActiveGetAPI = async () => {
    try {
        const data = await axios.get<CategoryGet[]>(`${CATEGORY_API}/getActiveCategories`);
        return data;
    } catch (error) {
        handleError(error);
    }
}
