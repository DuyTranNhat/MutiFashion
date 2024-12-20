import axiosInstance from "../Helpers/axiosInstance"
import { handleError } from "../Helpers/ErrorHandler"
import { CreateOrderRequest, ListOrderReponse, OrderGet } from "../Model/Order"
import { ORDER_API } from "../Utils/constant"

export const checkoutAPI = async (customerId: number, order: CreateOrderRequest) => {
    try {
        const data = await axiosInstance.post(`${ORDER_API}/Checkout/customerID/${customerId}`, order)
        return data
    } catch (error) {
        handleError(error)
    }
}

export const CompletedOrderGetAPI = async (orderID: number) => {
    try {
        const data = await axiosInstance.get<OrderGet>(`${ORDER_API}/getByID/${orderID}`)
        return data
    } catch (error) {
        handleError(error)
    }
}

export const HistoryOrderByCusAPI = async (page: number = 1, limit: number = 4) => {
    try {
        const data = await axiosInstance.get<ListOrderReponse>(`${ORDER_API}/getOrdersBycus/`, {
            params: { page, limit }
        })
        return data
    } catch (error) {
        handleError(error)
    }
}

