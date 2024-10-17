import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { SupplierGet, SupplierPost, SupplierPut } from "../Models/Supplier";
import { SupplierFormInput } from "../pages/Supplier/FormSupplier";

const api = "https://localhost:7194/api/Supplier";

export const supplierGetAPI = async () => {
    try {
        const data = await axios.get<SupplierGet[]>(`${api}/getAll`);
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const supplietUpfateStatusAPI = async (id: number) => {
    try {
        const data = await axios.put(api + "/updateStatus/" + id)
        return data;
    }  catch (error) {
        handleError(error);
    }
}

export const supplierPostAPI = async (formUpdate: SupplierFormInput) => {
        try {
            const data = await axios.post<SupplierPost>(`${api}/create`, { ...formUpdate });
            return data;
        } catch (error) {
            handleError(error)
        }
}

export const supplierPutAPI = async (id: string, formUpdate: SupplierFormInput) => {
    try {
        const data = await axios.put<SupplierPut>(`${api}/update/${id}`, { ...formUpdate })
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const supplierGetByIdAPI =  async (id: string) => {
    try {
        const data = await axios.get<SupplierGet>(api + "/getByID/" + id);
        return data;
    } catch (error) {
        handleError(error)
    }
}
