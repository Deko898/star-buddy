export interface IUser {
    username: string;
    id: string;
    email: string;
    token: string;
    role: string;
    password: string; // hashed
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
}

export enum UserRole {
    Admin,
    Celebrity,
    Client
}