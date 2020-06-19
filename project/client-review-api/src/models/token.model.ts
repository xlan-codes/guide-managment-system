import { User } from "./user.model";

export interface Token {
    Key: string;
    User: User;
}

export class AuthUser {
    // UserName: string;
    public Password: string;
    public Email: string;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface DataStoredInToken {
    _id: number;
}
   