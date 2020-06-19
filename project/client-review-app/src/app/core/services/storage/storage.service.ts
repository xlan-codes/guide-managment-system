
import { StorageData } from './storage.abstract';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class TokenStorageService extends StorageData {

    constructor(private _cookies: CookieService ) {
        super();
    }

    public async save(key: any, data: string | object): Promise<boolean> {
        this._cookies.set(key, data.toString());
        const stored = this._cookies.check(key);
        return await  Promise.resolve(stored);
    }

    public async get(key: string): Promise<string> {
        const stored = this._cookies.get(key);
        return await  Promise.resolve(stored);
    }

    public async delete(key: string): Promise<boolean> {
        this._cookies.delete(key);
        const deleted = this._cookies.check(key);
        
        // check if cookie deleted. if not exist on cookies storage. cookie with {key} name is deleted
        if (!deleted) {
            return await Promise.resolve(true);
        }
        return await  Promise.resolve(false);
    }

    public getSync(key: string): string {
        const stored = this._cookies.get(key);
        return stored;
    }


}
