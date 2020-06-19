import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { TokenStorageService } from '../storage/storage.service';
import { TOKEN_PATH } from 'app/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _tokenSrorageService: TokenStorageService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token =  this._tokenSrorageService.get(TOKEN_PATH);
        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(clonedRequest);
    }

}
