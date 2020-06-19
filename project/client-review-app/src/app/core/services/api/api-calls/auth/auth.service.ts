import { IAuth } from '../interfaces/auth.interface';
import { Token } from 'app/core/models/token.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthUser } from 'app/core/models/auth-user.model';
import { HttpClient } from '@angular/common/http';
import { API_URL, TOKEN_PATH } from 'app/constants';
import * as JwtDecode from 'jwt-decode';
import { TokenStorageService } from 'app/core/services/storage/storage.service';
import { User } from 'app/core/models/system-user-model';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService implements IAuth<Token> {

    private url: string;
    // private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private _httpClient: HttpClient, private _tokenStorage: TokenStorageService ) {
        this.url = '/auth';
    }

    public auth(authUser: AuthUser): Observable<Token>{
        return this._httpClient.post<Token>(API_URL + this.url, authUser);
    }

    public async isAuthenticated(): Promise<boolean> {

        const token = await this._tokenStorage.get(TOKEN_PATH);
        // Check whether the token is expired and return
        // true or false
        return await Promise.resolve(!this.isTokenExpired(token));
    }

    

    // public saveToken(token): void {
    //     localStorage.setItem(TOKEN, JSON.stringify(token));
    // }

    private getTokenExpirationDate(token: string): Date {
        const decoded = this.parseJwt(token) as any;

        if (decoded.exp === undefined) { return null; }
    
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
      }
    
    
     private isTokenExpired(token?: string): boolean {
        // if(!token) token = this.getToken();
        if (!token || token === '') { return true; }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
    
        return !(date.valueOf() > new Date().valueOf());
      }

    public async getAuthentecatedUser(): Promise<User> {
    const token = await this._tokenStorage.get(TOKEN_PATH);
    const decoded = this.parseJwt(token) as any;
    const user = {
        UserId: decoded.UserId,
        UserName: decoded.UserName,
        Name: decoded.Name,
        Email: decoded.Email,
        Password: decoded.Password,
        RoleId: decoded.RoleId,
    };
    return user;
    }

    private parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    
}

