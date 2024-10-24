import axios from "axios";
import { AttributeResponse } from "../Model/Attribute";
import { ATTRIBUTE_API } from "../Utils/constant";
import { handleError } from "../Helpers/ErrorHandler";

export const attributeGetAPI = async (page: number = 1, limit: number = 12) => {
    try {
        const data = await axios.get<AttributeResponse>(`${ATTRIBUTE_API}/GetOptions`, {
            params: { page, limit, isActive: true},
        });
        return data;
    } catch (error) {
        handleError(error)
    }
}
