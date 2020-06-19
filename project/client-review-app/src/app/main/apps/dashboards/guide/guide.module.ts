import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, 
    MatTableModule, MatTabsModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { GuideDashboardComponent } from 'app/main/apps/dashboards/guide/guide.component';
import { GuideService } from 'app/core/services/api/api-calls/guide/guide.service';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';


const routes: Routes = [
    {
        path     : '**',
        component: GuideDashboardComponent,
        // canActivate: [AuthGuard]
        // ,
        // resolve  : {
        //     data: null
        // }
    }
];

@NgModule({
    declarations: [
        GuideDashboardComponent
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

        NgxChartsModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        MatPaginatorModule,
        MatTableModule,

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers   : [
        GuideService,
        AuthGuard
    ]
})
export class GuideDashboardModule
{
}

