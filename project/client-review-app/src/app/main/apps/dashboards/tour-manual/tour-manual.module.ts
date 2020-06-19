import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, 
    MatTableModule, MatTabsModule, MatPaginatorModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { TourManualDashboardComponent } from 'app/main/apps/dashboards/tour-manual/tour-manual.component';
import { ManualService } from 'app/core/services/api/api-calls/manual/manual.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { TourService } from 'app/core/services/api/api-calls/tour/tour.service';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';


const routes: Routes = [
    {
        path     : '**',
        component: TourManualDashboardComponent,
        // canActivate: [AuthGuard]
        // ,
        // resolve  : {
        //     data: null
        // }
    }
];

@NgModule({
    declarations: [
        TourManualDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        NgSelectModule,
        NgxChartsModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        MatPaginatorModule,
        MatTableModule,

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        NgOptionHighlightModule
    ],
    providers   : [
        ManualService,
        TourService,
        AuthGuard
    ]
})
export class TourManualDashboardModule
{
}

