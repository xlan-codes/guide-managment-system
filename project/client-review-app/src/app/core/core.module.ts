
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    CookieService,
    JwtHelperService
  ]
})
export class CoreModule {

}
