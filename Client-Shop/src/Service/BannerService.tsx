import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { Slideresponse } from "../Model/Banner";
import { BANNER_API } from "../Utils/constant";

export const sliderGetAPI = async (page: number = 1, limit: number = 100) => {
    try {
        const data = await axios.get<Slideresponse>(`${BANNER_API}/getbanners`, {
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
