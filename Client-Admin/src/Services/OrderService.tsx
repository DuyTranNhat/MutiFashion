import axios from "axios"
import { OrderGet, OrderResponse, OrderStatusPost } from "../Models/Order"
import { handleError } from "../Helpers/ErrorHandler"
import { ORDER_API } from "../Utils/constant"

export const OrdersGetAPI = async (page: number = 1, limit: number = 6) => {
    try {
        const data = await axios.get<OrderResponse>(`${ORDER_API}/getOrders`)
        return data
    } catch (error) {
        handleError(error)
    }
}

export const StatusOrderUpdateAPI = async (idOrder: number, statusData: OrderStatusPost) => {
    try {
        const data = await axios.put(`${ORDER_API}/update-status-order/${idOrder}`, statusData)
        return data
    } catch (error) {
        handleError(error)
    }
}

  