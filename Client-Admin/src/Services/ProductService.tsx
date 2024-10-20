import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { ProductPost, ProductResponse } from "../Models/Product";
import { PRODUCT_API } from "../Utils/constant";

export const productPostAPI = async (productPost: ProductPost) => {
    try {
        const data = await axios.post<number>(`${PRODUCT_API}/create`, productPost);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const UploadImageProductAPI = async (image: File, id: number) => {
    try {
        const form = new FormData();
        form.append('ImageFile', image);
        

        const imageUploadResponse = await axios
            .post(`${PRODUCT_API}/uploadImage/${id}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return imageUploadResponse;
    } catch (error) {
        handleError(error)
    }
}

export const ProductGetAPI = async (page: number = 1, litmit: number = 12) => {
    try {
        const data = await axios.get<ProductResponse>(`${PRODUCT_API}/getAll`, {
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