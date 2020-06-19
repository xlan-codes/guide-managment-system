import { IAuthService } from "./interfaces/auth.interface";
import { injectable } from "inversify";
import { TokenData } from "../models/token.model";
import * as jwt from 'jsonwebtoken';
import { UserDto } from "../dto/user.dto";
require('dotenv').config();

@injectable()
export class AuthService implements IAuthService {



    public auth(): Promise<TokenData> {
        throw new Error("Method not implemented.");
    }

    public createToken(user: UserDto): TokenData {
        const expiresIn = 60 * 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;

        return {
          token: jwt.sign(
              user, 
              secret, 
              { expiresIn: expiresIn }
              ),
        } as TokenData;
    }   
    
}