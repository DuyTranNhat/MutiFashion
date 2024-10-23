import axios from "axios";
import { VariantResponse } from "../Model/Variant";
import { VARIANT_API } from "../Utils/constant";
import { handleError } from "../Helpers/ErrorHandler";

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