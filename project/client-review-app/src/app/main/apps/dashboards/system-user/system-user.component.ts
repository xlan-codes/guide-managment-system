import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import {Role} from '../../../../core/models/role.model';
import { UserService } from 'app/core/services/api/api-calls/user.service.ts/user.service';
import { RoleService } from 'app/core/services/api/api-calls/role-service/role.service';
import { User } from 'app/core/models/system-user-model';


@Component({
    selector     : 'system-user-dashboard',
    templateUrl  : './system-user.component.html',
    styleUrls    : ['./system-user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SystemUserDashboardComponent implements OnInit
{

    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'delete', 'edit'];
    displayedColumnsForRole: string[] = [ 'roleName', 'roleDescription', 'roleTag', 'delete', 'edit'];
    listSystemUsers: any;
    projects: any[];
    selectedProject: any;
    userList: Array<User>;
    roleList: Array<Role>;

    showSuccessMsg = false;
    showErrorMsg = false;
    disableSaveButton = false;



    dateNow = Date.now();

    userForm: FormGroup;
    roleForm: FormGroup;
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _formBuilder: FormBuilder,
        private _service: UserService,
        private _serviceRole: RoleService
    )
    {
        

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.userForm = this._formBuilder.group({
            firstName : ['', Validators.required],
            lastName  : ['', Validators.required],
            email  : ['', Validators.required],
            password  : ['', Validators.required],
            roleId  : ['', Validators.required],
        });

        this.roleForm = this._formBuilder.group({
            roleName : ['', Validators.required],
            roleDescription  : ['', Validators.required],
            roleTag  : ['', Validators.required],
        });

        this.filteredOptions = this.userForm.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }


    deleteUser(userId: number): void {
        // this.
    }

    editUser(userId: number): void {

    }

    getRoles(): void {

    }

    deleteRole(roleId: number): void {

    }

    editRole(roleId: number): void {

    }

    submitUser(): void {
        const user: User = new User();
        user.Email = this.userForm.controls.email.value;
        user.UserName = this.userForm.controls.firstName.value;
        user.Name = this.userForm.controls.lastName.value;
        user.Password = this.userForm.controls.password.value;
        user.RoleId = this.userForm.controls.roleId.value;
        this._service.createUser(user).subscribe((res: User) => {
            alert(res);
        }, (error) => {
            alert('error');
        });
    }

    submitRole(): void {
        const role: Role = new Role();
        role.roleName = this.roleForm.controls.roleName.value;
        role.roleDescription = this.roleForm.controls.roleDescription.value;
        role.roleTag = this.roleForm.controls.roleTag.value;
        this._serviceRole.createRole(role).subscribe((res: Role) => {
            alert(res);
        }, (error) => {
            alert('error');
        });
    }
}


