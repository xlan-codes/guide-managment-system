import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Guide } from 'app/core/models/guide.model';
import { environment } from 'environments/environment';
import { GuideReport } from 'app/core/models/guide-report.model';

@Injectable()
export class GuideService extends ApiService {

    private url: string;
    constructor(public httpClient: HttpClient) {
        super(httpClient);
        this.url = '/guides';
    }

    
    public getGuides(): Observable<Array<Guide>> {
        return this.get(this.baseUrl + this.url);
    }

    public postGuide(guide: Guide): Observable<Guide> {
        return this.post(this.baseUrl + this.url, guide);
    }

    public deleteGuide(guideId: number): Observable<any> {
        return this.delete(this.baseUrl + this.url + '/' + guideId);
    }
    
    public getReportByPortalId(portalId: number, date?: Date): Observable<Array<GuideReport>> {
        let params = new HttpParams();
        params =  params.append(environment.http_params.api.guide_service_report_portal_id, portalId.toString());
        params =  date ? params.append(environment.http_params.api.guide_service_report_portal_date, date.toISOString()) : params;
        return this.get(this.baseUrl + this.url + `/guide-review-by-portal`, 
        {
            params: params 
        }
        );
    }

}
