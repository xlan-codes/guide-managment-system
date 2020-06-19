import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Tour } from 'app/core/models/tour.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TourService extends ApiService {

    constructor(public httpClient: HttpClient) {
        super(httpClient);
    }

    
    public getTours(): Observable<Array<Tour>> {
        return this.get(this.baseUrl + '/tour');
    }

    public postTour(tour: Tour): Observable<Tour> {
        return this.post(this.baseUrl + '/tour', tour);
    }

}
