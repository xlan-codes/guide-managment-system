import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/core/models/system-user-model';

@Injectable()
export class UserService extends ApiService {

    private url: string;
    constructor(public httpClient: HttpClient) {
        super(httpClient);
        this.url = '/users';
    }

    
    public getUsers(): Observable<Array<User>> {
        return this.get(this.baseUrl + this.url);
    }

    public createUser(user: User): Observable<User> {
        return this.post(this.baseUrl + this.url, user);
    }

    public deleteUser(userId: number): Observable<any> {
        return this.delete(this.baseUrl + this.url + '/' + userId);
    }
    

}
