import { Observable } from 'rxjs';
import { AuthUser } from 'app/core/models/auth-user.model';

export interface IAuth<T> {
    auth(authUser: AuthUser): Observable<T>;
}
