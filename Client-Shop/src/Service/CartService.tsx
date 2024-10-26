import axiosInstance from "../Helpers/axiosInstance";
import { CART_API } from "../Utils/constant";
import { CartGet, CartPost, CartReponse } from "../Model/Cart";
import { handleError } from "../Helpers/ErrorHandler";


export const addCartAPI = async (cartPost: CartPost) => {
    try {
        const data = await axiosInstance.post(`${CART_API}/addItemToCart`, cartPost);
        return data
    } catch (error) {
        handleError(error)
    }
}

export const increaseQuantityAPI = async (idCart: number) => {
    try {
        const data = await axiosInstance.post(`${CART_API}/increaseQuantity/${idCart}`);
        return data
    } catch (error) {
        handleError(error)
    }
}

export const decreaseQuantityAPI = async (idCart: number) => {
    try {
        const data = await axiosInstance.post(`${CART_API}/decreaseQuantity/${idCart}`);
        return data
    } catch (error) {
       handleError(error)
    }
}

export const removeCartAPI = async (idCart: number) => {
    try {
        const data = await axiosInstance.delete(`${CART_API}/removecartitem/${idCart}`);
        return data
    } catch (error) {
       handleError(error)
    }   
}

export const CartGetAPI = async (idUser: number, page: number, limit: number) => {
    try {
        const data = await axiosInstance.get<CartReponse>(`${CART_API}/getCartsUser/${idUser}`, {
            params: { page, limit }
        });
        return data
    } catch (error) {
        handleError(error)
    }
}

