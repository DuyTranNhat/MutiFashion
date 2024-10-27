import axiosInstance from "../Helpers/axiosInstance"
import { handleError } from "../Helpers/ErrorHandler"
import { UserProfile } from "../Model/User"
import { USER_API } from "../Utils/constant"

export const customerGetAPI = async (idUser: number) => {
    try {
        const data = await axiosInstance.get<UserProfile>(`${USER_API}/GetById/${idUser}`)
        return data
    } catch (error) {
        handleError(error)
    }
}