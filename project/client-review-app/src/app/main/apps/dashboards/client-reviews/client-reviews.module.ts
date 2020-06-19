import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, 
    MatSelectModule, MatInputModule, MatStepperModule, MatAutocompleteModule, MatDatepickerModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AnalyticsDashboardComponent } from 'app/main/apps/dashboards/client-reviews/client-reviews.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { TourService } from 'app/core/services/api/api-calls/tour/tour.service';
import { PortalService } from 'app/core/services/api/api-calls/portal/portal.service';
import { GuideService } from 'app/core/services/api/api-calls/guide/guide.service';
import { ClientService } from 'app/core/services/api/api-calls/client/client.service';
import { AuthService } from 'app/core/services/api/api-calls/auth/auth.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';

const routes: Routes = [
    {
        path     : '**',
        component: AnalyticsDashboardComponent,
        // canActivate: [AuthGuard]
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
        AnalyticsDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatAutocompleteModule,
        FuseSharedModule,
        MatDatepickerModule, 
        MatMomentDateModule,
        FormsModule,
        NgSelectModule,
        // NgOptionHighlightModule,
        // CoreModule
    ],
    providers   : [
        { provide: MAT_DATE_LOCALE, useValue: 'it' }, // you can change useValue
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        TourService,
        GuideService,
        PortalService,
        ClientService,
        AuthService,
        AuthGuard
        // JwtHelperService
    ]
})
export class ClientReviewsModule
{
}

