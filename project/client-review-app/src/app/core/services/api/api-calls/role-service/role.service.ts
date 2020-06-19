import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Role} from '../../../../models/role.model';

@Injectable()
export class RoleService extends ApiService {

    private readonly url: string;
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.url = '/roles';
    }

    public getRole(limit?: number, offset?: number, filter?: any): Observable<Array<Role>> {
        return super.get(this.baseUrl + this.url);
    }

    public createRole(role: Role): Observable<Role> {
        return super.post(this.baseUrl + this.url, role);
    }

    public updateRole(role: Role): Observable<any> {
        return super.update(this.baseUrl + this.url, role);
    }

    public deleteRole(id: number): Observable<boolean> {
        return super.delete(this.baseUrl + this.url + '/' + id);
    }

}
