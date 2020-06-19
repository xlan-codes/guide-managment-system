import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/services/api/api-calls/auth/auth.service';
import { AuthUser } from 'app/core/models/auth-user.model';
import { Token } from 'app/core/models/token.model';
import { TokenStorageService } from 'app/core/services/storage/storage.service';
import { TOKEN_PATH } from 'app/constants';
import { Router } from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    public loginForm: FormGroup;
    hasHttpError: boolean;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _tokenStorage: TokenStorageService,
        private _router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void>
    {
                
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        const isAuthenticated = await this._authService.isAuthenticated();

        if (isAuthenticated) {
            this._router.navigate(['/apps/dashboards/add-client-review']);
        }

    }

    public onSubmit(): void {
        if (this.loginForm.invalid){
            return;
        }

        const authUser = new AuthUser(this.loginForm.value.email, this.loginForm.value.password);
        this._authService.auth(authUser).subscribe((token: Token) => {
            debugger
            if (token) {
                this._tokenStorage.save(TOKEN_PATH, token.token);
                this._router.navigate(['/apps/dashboards/add-client-review']);
                
            }
        }, (error: any) => {
        debugger
            this.hasHttpError = true;
        });
    }
}
