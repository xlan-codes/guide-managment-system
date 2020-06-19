import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses.component';
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
        component: ExpensesComponent,
        // canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [ExpensesComponent],
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
export class ExpensesModule {}
