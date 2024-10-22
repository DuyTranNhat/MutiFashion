import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { CategoryGet, CategoryPost, CategoryUpdate, CategoryResponse } from '../Models/Category'
import { CATEGORY_API } from "../Utils/constant";

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

export const categoryUpdateStatusAPI = async (id: number) => {
    try {
        const data = await axios.put(`${CATEGORY_API}/toggleStatus/${id}`)
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const categoryPostAPI = async (formUpdate: CategoryUpdate) => {
    try {
        const data = await axios.post<CategoryPost>(`${CATEGORY_API}/create`, { ...formUpdate });
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const categoryUpdateAPI = async (id: string, formUpdate: CategoryUpdate) => {
    try {
        const data = await axios.put<CategoryUpdate>(`${CATEGORY_API}/update/${id}`, formUpdate)
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const categoryGetByIdAPI = async (id: string) => {
    try {
        const data = await axios.get<CategoryGet>(`${CATEGORY_API}/getByID/${id}`);
        return data;
    } catch (error) {
        handleError(error)
    }
}
