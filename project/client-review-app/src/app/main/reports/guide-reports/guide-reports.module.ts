import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideReportsComponent } from './guide-reports.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';


const routes: Routes = [
    {
        path     : '**',
        component: GuideReportsComponent,
        // canActivate: [AuthGuard]
    }
];


@NgModule({
  declarations: [
      GuideReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
        AuthGuard
  ]
})
export class GuideReportsModule { }
