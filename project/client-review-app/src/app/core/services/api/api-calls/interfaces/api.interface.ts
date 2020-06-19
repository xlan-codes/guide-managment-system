import { Observable } from 'rxjs';

export interface IApi {
    post(url: string, body?: any|null, options?: any): Observable<any>;
    update(url: string, body?: any|null, options?: any): Observable<any>;
    delete(url: string, options?: any): Observable<any>;
    get(url: string, options?: any): Observable<any>;
}
