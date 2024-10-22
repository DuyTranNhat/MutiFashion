import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { BannerGet, SupplierResponse } from "../Models/Banner";
import { BANNER_API } from "../Utils/constant";

export const bannerGetAPI = async (page: number = 1, limit: number = 100) => {
    try {
        const data = await axios.get<SupplierResponse>(`${BANNER_API}/getbanners`, {
            params : {
                page: page,
                limit: limit,
            },
        });
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const bannerDeleteAPI = async (id: number) => {
    try {
        const data = await axios.delete(`${BANNER_API}/delete/${id}`);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const bannerPostAPI = async (formData: FormData) => {
    try {
        const data = await axios.post(`${BANNER_API}/createBanner`, formData)
        return data;
    } catch (error) {
        handleError(error)
    }
}


export const bannerUpdateAPI = async (id: number, formData: FormData) => {
    try {
        const data = await axios.put(`${BANNER_API}/update/${id}`, formData)
        return data;
    } catch (error) {
        handleError(error)
    }
}


export const bannerToggleActiveAPI = async (id: number) => {
    try {
        const data = await axios.put(`${BANNER_API}/updateStatus/${id}`)
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const bannerGetByIdAPI = async (id: string) => {
    try {
        const data = await axios.get<BannerGet>(`${BANNER_API}/getByID/${id}`);
        return data;
    } catch (error) {
        handleError(error)
    }
}