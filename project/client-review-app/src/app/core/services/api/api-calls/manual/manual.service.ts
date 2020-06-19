import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Manual } from 'app/core/models/manual.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ManualService extends ApiService {

    url: string;
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.url = '/manuals';
    }

    
    public getManuals(): Observable<Array<Manual>> {
        return this.get(this.baseUrl + this.url);
    }

    public postManual(extraData: Manual, fileItem: File): Observable<any> {
        
        const apiCreateEndpoint = this.baseUrl + this.url;
        const formData: FormData = new FormData();

        formData.append('myFile', fileItem, fileItem.name);
        formData.append('manual', JSON.stringify(extraData));

        const req = new HttpRequest('POST', apiCreateEndpoint, formData);
        return this.httpClient.request(req);

    }
    

}
