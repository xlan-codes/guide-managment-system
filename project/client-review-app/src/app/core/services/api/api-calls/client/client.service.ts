import { ApiService } from '../api.service';
import { ReviewDto, ClientReview } from 'app/core/models/client-review.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ClientService extends ApiService {

    url: string;
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.url = '/customers';
    }

    
    public getClientReviews(): Observable<Array<ReviewDto>> {
        return this.get(this.baseUrl + this.url + '/getReviews');
    }

    public postReview(clientReview: ClientReview, photoReviewFile: File): Observable<any> {
        const apiCreateEndpoint = this.baseUrl + this.url;
        const formData: FormData = new FormData();

        // formData.append('photoReviewFile', photoReviewFile, photoReviewFile.name);
        formData.append('clientReview', JSON.stringify(clientReview));

        const req = new HttpRequest('POST', apiCreateEndpoint, formData);
        return this.httpClient.request(req);
    }

    deleteReview(reviewId: number): Observable<boolean> {
        return this.delete(this.baseUrl + this.url + `/deleteReviews/${reviewId}`);
    }

}
