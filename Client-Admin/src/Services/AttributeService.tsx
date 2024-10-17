import axios from "axios"
import { handleError } from "../Helpers/ErrorHandler";
import { AttributeGet, AttributePost, AttributeUpdate } from "../Models/Option"
import { AttributeFormInput } from "../pages/Attribute/FormAttrbute";

const api = "https://localhost:7194/api/option"

export const attributeGetAPI = async () => {
    try {
        const data = await axios.get<AttributeGet[]>(`${api}/GetAll`);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const attributeGetActiveAPI = async () => {
    try {
        const data = await axios.get<AttributeGet[]>(api + "/getAllActive");
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const attributePostAPI = async (form: AttributeFormInput) => {
    try {
        const data = await axios.post<AttributePost[]>(`${api}/create`, form);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const attributeUpdateAPI = async (id: string, form: AttributeFormInput) => {
    try {
        const data = await axios.put<AttributeUpdate[]>(api + "/update/" + id, form);
        return data;
    } catch (error) {
        handleError(error)
    }
}


export const attributeActiveAPI = async (id: number) => {
    try {
        const data = await axios.put<AttributeGet>(api + "/updateStatus/" + id);
        return data;
    } catch (error) {   
        handleError(error)
    }
}

export const attributeGetByIdAPI = async (id: string) => {
    try {
        const data = await axios.get<AttributeGet>(api + "/getByID/" + id);
        return data;
    } catch (error) {
        handleError(error)
    }
}
