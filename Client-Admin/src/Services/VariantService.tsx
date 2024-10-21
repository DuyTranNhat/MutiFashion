import axios from "axios";
import { ImageGet, ProductResponse } from "../Models/Variant";
import { VARIANT_API } from "../Utils/constant";
import { handleError } from "../Helpers/ErrorHandler";

export const VariantGetAPI = async (page: number = 1, litmit: number = 12) => {
    try {
        const data = await axios.get<ProductResponse>(`${VARIANT_API}/getVariants`, {
            params: {
                page: page,
                limit: litmit,
            },
        });
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const upLoadListImageAPI = async (images: FileList | null, variantId: number) => {
    try {
        if (images && images.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {
                formData.append('fileImages', images[i]);
            }
            formData.append('VariantId', variantId.toString());
            const imageUploadResponse = await axios.post
            (`${VARIANT_API}/uploadListImages/${variantId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return imageUploadResponse;
        }
    } catch (error) {
        handleError(error)
    }
}

export const ImgListGetByIDVariantAPI = async (idVariant: string) => {
    try {
        const response = await axios.get<ImageGet[]>(`${VARIANT_API}/getListImage/${idVariant}`)
        return response
    } catch (error) {
        handleError(error)
    }
}