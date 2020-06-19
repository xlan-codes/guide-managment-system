import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
import { AuthService } from 'app/core/services/api/api-calls/auth/auth.service';
import { TokenStorageService } from 'app/core/services/storage/storage.service';

const routes = [
    {
        path     : '**',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,

        // CoreModule
    ],
    providers: [
        AuthService,
        TokenStorageService
    ]
})
export class LoginModule
{
}
