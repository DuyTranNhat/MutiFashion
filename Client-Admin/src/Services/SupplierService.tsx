import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { SupplierGet, SupplierPost, SupplierPut, SupplierResponse } from "../Models/Supplier";
import { SupplierFormInput } from "../pages/Supplier/FormSupplier";
import { SUPPLIER_API } from "../Utils/constant";

export const supplierGetAPI = async (page: number = 1, limit: number = 100) => {
    try {
        const data = await axios.get<SupplierResponse>(`${SUPPLIER_API}/getAll`, {
            params : {
                page: page,
                limit: limit,
            },
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const supplietUpfateStatusAPI = async (id: number) => {
    try {
        const data = await axios.put(`${SUPPLIER_API}/updateStatus/${id}`)
        return data;
    }  catch (error) {
        handleError(error);
    }
}

export const supplierPostAPI = async (formUpdate: SupplierFormInput) => {
        try {
            const data = await axios.post<SupplierPost>(`${SUPPLIER_API}/create`, formUpdate);
            return data;
        } catch (error) {
            handleError(error)
        }
}

export const supplierPutAPI = async (id: string, formUpdate: SupplierFormInput) => {
    try {
        const data = await axios.put<SupplierPut>(`${SUPPLIER_API}/update/${id}`, formUpdate)
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const supplierGetByIdAPI =  async (id: string) => {
    try {
        const data = await axios.get<SupplierGet>(`${SUPPLIER_API}/getByID/${id}`);
        return data;
    } catch (error) {
        handleError(error)
    }
}
