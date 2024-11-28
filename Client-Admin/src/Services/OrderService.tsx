import axios from "axios"
import { OrderGet, OrderResponse, OrderStatusPost } from "../Models/Order"
import { handleError } from "../Helpers/ErrorHandler"
import { ORDER_API } from "../Utils/constant"
import { RangeDate, RangeDateNoTop, ResponseListOrder, ResponseListVariantNoTop, TopVariant, YearReport } from "../Models/Chart"

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

//chart

export const GetListTopVariant = async (rangDate:RangeDate) => {
    try {
        const data = await axios.get<TopVariant[]>(`${ORDER_API}/get-top-variant`, {
            params:{
                top : rangDate.top,
                startDate:rangDate.startDate,
                endDate:rangDate.endDate
            }
        })
        return data
    } catch (error) {
        handleError(error)
    }
}
  
export const GetListVariantInRange = async (rangDate:RangeDateNoTop,page:number,limit:number) => {
    try {
        const data = await axios.get<ResponseListVariantNoTop>(`${ORDER_API}/get-top-variant-in-range`, {
            params:{
                startDate:rangDate.startDate,
                endDate:rangDate.endDate,
                limit:limit,
                page:page

            }
        })
        return data
    } catch (error) {
        handleError(error)
    }
}

export const GetListOrderMonthly = async ( year:number) => {
    try {
        const data = await axios.get<YearReport[]>(`${ORDER_API}/get-top-variant-year`, {
            params:{
                year: year,
            }
        })
        return data
    } catch (error) {
        handleError(error)
    }
}

export const GetListOrderYear = async ( year:number,page:number=1,limit:number=10) => {
    try {
        const data = await axios.get<ResponseListOrder>(`${ORDER_API}/get-order-monthly`, {
            params:{
                year: year,
                page: page,
                limit: limit
            }
        })
        console.log("data service:", data)
        return data
    } catch (error) {
        handleError(error)
    }
}
 

  