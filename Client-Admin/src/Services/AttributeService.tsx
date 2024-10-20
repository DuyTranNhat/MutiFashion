import axios from "axios"
import { handleError } from "../Helpers/ErrorHandler";
import { AttributeGet, AttributePost, AttributeUpdate } from "../Models/Option"
import { AttributeFormInput } from "../pages/Attribute/FormAttrbute";
import { ATTRIBUTE_API } from "../Utils/constant";

export const attributeGetAPI = async () => {
    try {
        const data = await axios.get<AttributeGet[]>(`${ATTRIBUTE_API}/GetAll`);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const attributeGetActiveAPI = async () => {
    try {
        const data = await axios.get<AttributeGet[]>(`${ATTRIBUTE_API}/getAllActive`);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const attributePostAPI = async (form: AttributeFormInput) => {
    try {
        const data = await axios.post<AttributePost[]>(`${ATTRIBUTE_API}/create`, form);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const attributeUpdateAPI = async (id: string, form: AttributeFormInput) => {
    try {
        const data = await axios.put<AttributeUpdate[]>(`${ATTRIBUTE_API}/update/${id}`, form);
        return data;
    } catch (error) {
        handleError(error)
    }
}


export const attributeActiveAPI = async (id: number) => {
    try {
        const data = await axios.put<AttributeGet>(`${ATTRIBUTE_API}/updateStatus/${id}`);
        return data;
    } catch (error) {   
        handleError(error)
    }
}

export const attributeGetByIdAPI = async (id: string) => {
    try {
        const data = await axios.get<AttributeGet>(`${ATTRIBUTE_API}/getByID/${id}`);
        return data;
    } catch (error) {
        handleError(error)
    }
}
