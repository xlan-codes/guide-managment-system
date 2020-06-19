import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'dashboards/add-client-review',
        loadChildren: './dashboards/client-reviews/client-reviews.module#ClientReviewsModule'
    },
    {
        path        : 'dashboards/clients-reviews-list',
        loadChildren: './dashboards/client-review-list/client-review-list.module#ClientReviewListModule'
    },
    {
        path        : 'dashboards/guide',
        loadChildren: './dashboards/guide/guide.module#GuideDashboardModule'
    },
    {
        path        : 'dashboards/portal',
        loadChildren: './dashboards/portal/portal.module#PortalDashboardModule'
    },
    {
        path        : 'dashboards/user',
        loadChildren: './dashboards/system-user/system-user.module#SystemUserDashboardModule'
    },
    {
        path        : 'dashboards/tour-manual',
        loadChildren: './dashboards/tour-manual/tour-manual.module#TourManualDashboardModule'
    },
    {
        path        : 'dashboards/tour-payments',
        loadChildren: '../finances/payments/payments.module#PaymentsModule'
    },
    {
        path        : 'dashboards/tour-expenses',
        loadChildren: '../finances/expenses/expenses.module#ExpensesModule'
    },
    {
        path        : 'guide-reports',
        loadChildren: '../reports/guide-reports/guide-reports.module#GuideReportsModule'
    },
    {
        path        : 'portal-reports',
        loadChildren: '../reports/portal-reports/portal-reports.module#PortalReportsModule'
    },
    {
        path        : 'guide-ranking-portal',
        loadChildren: '../reports/guide-ranking-portal/guide-ranking-portal.module#GuideRankingPortalModule'
    },
    {
        path        : 'file-manager',
        loadChildren: './file-manager/file-manager.module#FileManagerModule'
    },
    {
        path        : 'login',
        loadChildren: '../pages/authentication/login/login.module#LoginModule'
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule
{
}
