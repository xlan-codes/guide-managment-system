import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideRankingPortalComponent } from './guide-ranking-portal.component';
import { Routes, RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { GuideService } from 'app/core/services/api/api-calls/guide/guide.service';
import {
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
    MatStepperModule,
    MAT_DATE_LOCALE,
    DateAdapter,
    MAT_DATE_FORMATS
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgSelectModule } from '@ng-select/ng-select';
import { PortalService } from 'app/core/services/api/api-calls/portal/portal.service';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';

const routes: Routes = [
    {
        path: '**',
        component: GuideRankingPortalComponent,
        // canActivate: [AuthGuard]
    }
];
export const MY_FORMATS = {
    parse: {
      dateInput: 'MM/YYYY',
    },
    display: {
      dateInput: 'MM/YYYY',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'MM/YYYY',
      monthYearA11yLabel: 'MM YYYY',
    },
  };

@NgModule({
    declarations: [GuideRankingPortalComponent],
    imports: [
        CommonModule,
        StarRatingModule.forRoot(),
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
        NgSelectModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'it' }, // you can change useValue
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        GuideService,
        PortalService,
        AuthGuard
    ]
})
export class GuideRankingPortalModule {}
