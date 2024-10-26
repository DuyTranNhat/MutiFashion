import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { LoginReponseDto, LoginRequest, LogoutRequest, RegisterRequest, UserProfile } from "../Model/User";
import { AUTH_API, BASE_URL } from "../Utils/constant";


export const RegisterAPI = async (form: RegisterRequest) => {
    try {
        const data = await axios.post<UserProfile>(`${BASE_URL}/register`, form);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const LoginAPI = async (form: LoginRequest) => {
    try {
        const data = await axios.post<LoginReponseDto>(`${AUTH_API}/login`, form);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const LogoutApi = async (form: LogoutRequest) => {
    try {
        const data = await axios.post<LoginReponseDto>(`${AUTH_API}/logout`, form);
        return data;
    } catch (error) {
        handleError(error);
    }
};

