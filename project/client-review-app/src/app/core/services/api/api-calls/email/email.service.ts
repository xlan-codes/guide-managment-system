import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Email } from 'app/core/models/email.model';
import { HttpClient } from '@angular/common/http';


export class EmaiService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    
    public getEmails(): Observable<Array<Email>> {
        return this.get(this.baseUrl);
    }

    public postEmail(email: Email): Observable<Email> {
        return this.post(this.baseUrl, email);
    }

}
