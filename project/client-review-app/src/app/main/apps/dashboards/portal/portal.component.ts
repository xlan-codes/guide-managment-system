import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { PortalService } from 'app/core/services/api/api-calls/portal/portal.service';
import { Portal } from 'app/core/models/portal.model';

@Component({
    selector     : 'portal-dashboard',
    templateUrl  : './portal.component.html',
    styleUrls    : ['./portal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PortalDashboardComponent implements OnInit
{
    portalList: Portal[];
    displayedColumns: string[] = ['id', 'portalcode', 'name', 'delete'];
    selectedProject: any;

    showSuccessMsg = false;
    showErrorMsg = false;
    disableSaveButton = false;

    dateNow = Date.now();

    form: FormGroup;
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
        private _portalService: PortalService
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
        this.getPortalList();
        this.form = this._formBuilder.group({
            portalCode : ['', Validators.required],
            portalName  : ['', Validators.required]
        });

        this.filteredOptions = this.form.valueChanges
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private getPortalList(): void {
        this._portalService.getPortals().subscribe((portalList: Portal[]) => {
            this.portalList = portalList;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Protected methods
    // -----------------------------------------------------------------------------------------------------

    onSubmit(): void {
         // stop here if form is invalid
         if (this.form.invalid) {
            return;
        }
        this.disableSaveButton = true;
        this._portalService.postPortal(this.form.value).subscribe((portal: Portal) => {
            this.portalList.push(portal);
            this.showSuccessMsg =  true;
            this.disableSaveButton = false;
        }, (error: any) => {
            this.showSuccessMsg = false;
            this.showErrorMsg = true;
            this.disableSaveButton = false;
        });
    }

    public deletePortal(portalCode: string): void {
        this._portalService.deletePortal(portalCode).subscribe((res: any) => { 
            if (res === true){
                this.portalList = this.portalList.filter((e) => e.portalCode !== portalCode);
            }
        });
    }
}


