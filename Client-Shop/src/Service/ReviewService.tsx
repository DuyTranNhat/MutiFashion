import axios from "axios";
import { REVIEW_API } from "../Utils/constant";
import { ReviewGet, ReviewPost, ReviewResponse } from "../Model/Review";
import { handleError } from "../Helpers/ErrorHandler";

export const ProductReviewGetAPI = async (idPro: string, page: number = 1, limit: number = 3) => {
    try {
        const data = await axios.get<ReviewResponse>(`${REVIEW_API}/get-review-by-product/${idPro}`, {
            params: {
                page: page,
                limit: limit,
            },
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const ProductReviewPostAPI = async (dataPost: ReviewPost) => {
    try {
        const data = await axios.post<ReviewGet>(`${REVIEW_API}/create`, dataPost);
        return data;
    } catch (error) {
        handleError(error);
    }
}



