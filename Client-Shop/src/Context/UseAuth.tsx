import React, { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginRequest, LogoutRequest, RegisterRequest, TokenKit, UserProfile } from "../Model/User";
import { LoginAPI, LogoutApi, refreshTokenAPI, RegisterAPI } from "../Service/AuthService";
import { getCookie, deleteCookie, setCookie } from "../Helpers/CookieHelper";


type UserContextType = {
    isReady: boolean;
    user: UserProfile | null;
    logout: () => void;
    isLoggedIn: () => boolean;
    handleTokenRefresh: () => void;
    login: (form: LoginRequest) => void;
    registerUser: (form: RegisterRequest) => void;
};

type Props = { children: React.ReactNode }

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedRefreshToken = localStorage.getItem("refreshtoken");
        const accessToken = getCookie("accessToken");

        if (storedUser && storedRefreshToken && accessToken) {
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        }
        setIsReady(true);
    }, [user?.customerId]);

    const registerUser = async (form: RegisterRequest) => {
        await RegisterAPI(form)
            .then((res) => {
                if (res) {
                    const UserObj: UserProfile = {
                        role: res.data.role,
                        name: res.data.name,
                        phone: res.data.phone,
                        email: res.data.email,
                        address: res.data.address,
                        imageUrl: res.data.imageUrl,
                        customerId: res.data.customerId
                    };
                    setUser(UserObj);
                    toast.success("Register success!");
                }
            }).catch(() => toast.warning("Server error occurred"));
    }

    const login = async (form: LoginRequest) => {
        await LoginAPI(form)
            .then(res => {
                if (res?.data) {
                    const userResponse = res.data.user;
                    const tokenKit = res.data.tokenKit;

                    setCookie("accessToken", tokenKit.accessToken, 1);
                    localStorage.setItem("refreshtoken", tokenKit.refreshToken);

                    axios.defaults.headers.common["Authorization"] = "Bearer " + tokenKit.accessToken;
                    const UserObj: UserProfile = {
                        role: userResponse.role,
                        name: userResponse.name,
                        phone: userResponse.phone,
                        email: userResponse.email,
                        address: userResponse.address,
                        imageUrl: userResponse.imageUrl,
                        customerId: userResponse.customerId
                    };

                    setUser(UserObj);
                    localStorage.setItem("user", JSON.stringify(UserObj));
                    navigate("/");
                    toast.success("Login Successfully!");
                }
            }).catch(error => {
                console.error("Login Error:", error);
                toast.warning(error.message || "An unexpected error occurred");
            });
    }

    const handleTokenRefresh = async () => {
        try {
            const accessToken = getCookie("accessToken") ?? "";
            const refreshToken = localStorage.getItem("refreshtoken") ?? "";
            const tokenKit: TokenKit = {
                accessToken,
                refreshToken
            }
            const res = await refreshTokenAPI(tokenKit);
            if (res) {
                const newTokenKit = res?.data;

                setCookie("accessToken", newTokenKit.accessToken, 1);
                localStorage.setItem("refreshtoken", newTokenKit.refreshToken);
            }
        } catch (error) {
            console.error("Token refresh failed", error);
            return null;
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = async () => {
        if (!user) {
            toast.warn("No user is logged in.");
            return;
        }

        const request: LogoutRequest = {
            idUser: user.customerId,
        };

        await LogoutApi(request)
            .then(res => {
                if (res?.status === 200) {
                    localStorage.removeItem("refreshtoken");
                    localStorage.removeItem("user");
                    deleteCookie("accessToken");
                    setUser(null);
                    delete axios.defaults.headers.common["Authorization"];
                    navigate("/login");
                    toast.success("Logged out successfully");
                }
            }).catch(error => toast.error(error));
    };


    return (
        <UserContext.Provider
            value={{ user, registerUser, login, logout, isLoggedIn, handleTokenRefresh, isReady }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
