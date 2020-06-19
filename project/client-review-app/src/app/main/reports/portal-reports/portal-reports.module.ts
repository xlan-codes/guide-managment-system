import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalReportsComponent } from './portal-reports.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';


const routes: Routes = [
    {
        path     : '**',
        component: PortalReportsComponent,
        // canActivate: [AuthGuard]
    }
];


@NgModule({
  declarations: [
      PortalReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
        // AuthGuard
  ]
})
export class PortalReportsModule { }
