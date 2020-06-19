import { Injectable } from '@angular/core';
import { Router,  CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { URL_PATH } from 'app/constants';

@Injectable()
export class AuthGuard implements  CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  async  canActivate(): Promise<boolean> {
    const isAuthenticated = await this.auth.isAuthenticated();
    debugger
    if (!isAuthenticated) {
      this.router.navigate([URL_PATH.LOGIN]);
      return false;
    }
    return true;
  }
}