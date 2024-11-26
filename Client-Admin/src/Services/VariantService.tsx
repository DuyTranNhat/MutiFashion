import axios from "axios";
import { FilterVariantPost, ImageGet, VariantResponse } from "../Models/Variant";
import { VARIANT_API } from "../Utils/constant";
import { handleError } from "../Helpers/ErrorHandler";
import { VariantUpdateDto } from "../pages/Variant/Details/FormVariantDetails";

export const VariantGetAPI = async (page: number = 1, litmit: number = 12) => {
    try {
        const data = await axios.get<VariantResponse>(`${VARIANT_API}/getVariants`, {
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

export const VariantUpdatedGet = async (idVariant: number) => {
    try {
        const data = await axios.get<VariantUpdateDto>(`${VARIANT_API}/get-updated-variant/${idVariant}`);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const VariantUpdatedPost = async (variantUpdated: VariantUpdateDto) => {
    try {
        const data = await axios.put<VariantUpdateDto>(`${VARIANT_API}/update`, variantUpdated);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const VariantFilterAPI = async (filterQuery: FilterVariantPost, page: number = 1, litmit: number = 4) => {
    try {
        const data = await axios.post<VariantResponse>(`${VARIANT_API}/filterVariants`, filterQuery, {
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

export const ImageVariantDelete = async (idImg: number) => {
    try {
        const response = await axios.delete<any>(`${VARIANT_API}/deleteImageVariant/${idImg}`)
        return response
    } catch (error) {
        handleError(error)
    }
}