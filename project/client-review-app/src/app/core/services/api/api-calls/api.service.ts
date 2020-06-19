import { IApi } from './interfaces/api.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'app/constants';

@Injectable()
export class ApiService implements IApi {
    
    
    protected baseUrl: string;
    constructor(public http: HttpClient) {
        this.baseUrl =  API_URL;
    }

    public post(url: string, body?: any, options?: any): Observable<any> {
        return this.http.post(url, body, options);
    }

    public update(url: string, body?: any, options?: any): Observable<any> {
        return this.http.put(url, body, options);
    }

    public delete(url: string, options?: any): Observable<any> {
        return this.http.delete(url, options);
    }

    public get(url: string, options?: any): Observable<any> {
        return this.http.get(url, options);
    }
    
}

