import { Path, POST } from "typescript-rest";
import { AuthUser, TokenData } from "../models/token.model";
import { UserService } from "../servicies/users.service";
import { container } from "../../inversify.config";
import { TYPES } from "../../types";
import { AuthService } from "../servicies/auth.service";
import { createHttpError } from "../utils/httpErrors";

@Path("auth")
export class AuthController {
    private userService: UserService;
    private authService: AuthService;
    
    constructor() {
        this.userService = container.get<UserService>(TYPES.UserService);
        this.authService = container.get<AuthService>(TYPES.AuthService);
    }

    @POST
    public async auth(authUser: AuthUser): Promise<TokenData>{

        const user = await this.userService.getUserWithEmailAndPassword(authUser.Email, authUser.Password);
        if(user) {
            const token = this.authService.createToken(user);
            return token;
        }
        throw createHttpError(401, "Unauthorized");
    }

    
}