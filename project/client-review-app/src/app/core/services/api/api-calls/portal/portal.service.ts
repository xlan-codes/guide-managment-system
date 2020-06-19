import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portal } from 'app/core/models/portal.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PortalService extends ApiService {

    private url: string;
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.url = '/portals';
    }

    public getPortals(): Observable<Array<Portal>> {
        return this.get(this.baseUrl + this.url);
    }

    public postPortal(portal: Portal): Observable<Portal> {
        return this.post(this.baseUrl + this.url, portal);
    }

    public deletePortal(portalCode): Observable<any> {
        return this.delete(this.baseUrl + this.url + '/' + portalCode);
    }


}
