export type LoginReponseDto = {
    tokenKit: TokenKit;
    user: UserProfile;
}


export type LoginRequest = {
    email: string;
    password: string;
}

export type TokenKit = {
    accessToken: string;
    refreshToken: string;
}

export type UserProfile = {
    role: string;
    name: string;
    email: string;
    customerId: number;
    phone: string | null;
    address: string | null;
    imageUrl: string | null;
}

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
}

export type LogoutRequest = { 
    idUser: number
}