import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { Routes, RouterModule } from '@angular/router';
import {
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatInputModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { AuthGuard } from 'app/core/services/api/api-calls/auth/auth-guard.service';

const routes: Routes = [
    {
        path: '**',
        component: PaymentsComponent,
        // canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [PaymentsComponent],
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [
          AuthGuard
    ]
})
export class PaymentsModule {}
