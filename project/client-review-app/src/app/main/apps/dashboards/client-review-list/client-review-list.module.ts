import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatTabsModule, MatAutocompleteModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatIconModule, MatSelectModule, MatDatepickerModule, MatStepperModule } from '@angular/material';
import { ClientReviewListComponent } from './client-review-list.component';
import { ClientService } from 'app/core/services/api/api-calls/client/client.service';
import { TruncatePipe } from 'app/core/pipes/limit-to.pipe';
import { MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { TourService } from 'app/core/services/api/api-calls/tour/tour.service';
import { GuideService } from 'app/core/services/api/api-calls/guide/guide.service';
import { PortalService } from 'app/core/services/api/api-calls/portal/portal.service';
import { AuthService } from 'app/core/services/api/api-calls/auth/auth.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';

const routes: Routes = [
    {
        path     : '**',
        component: ClientReviewListComponent,
        // canActivate: [AuthGuard]
        // resolve  : {
        //     data: null // service
        // }
    }
];

export const MY_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MM YYYY',
    },
  };


@NgModule({
    declarations: [
        ClientReviewListComponent,
        TruncatePipe
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatStepperModule,
        FuseSharedModule,
        MatMomentDateModule,
        FormsModule
        
    ],

    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'it' }, // you can change useValue
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        TourService,
        GuideService,
        PortalService,
        ClientService,
        AuthService,
        AuthGuard
    ]
})
export class ClientReviewListModule
{
}

