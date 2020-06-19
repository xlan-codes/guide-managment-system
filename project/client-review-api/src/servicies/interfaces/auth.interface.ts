import { TokenData } from "../../models/token.model";

export interface IAuthService {
    auth(): Promise<TokenData>;
}