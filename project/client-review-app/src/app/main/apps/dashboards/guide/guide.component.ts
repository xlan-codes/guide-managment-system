import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  Observable } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { GuideService } from 'app/core/services/api/api-calls/guide/guide.service';
import { Guide } from 'app/core/models/guide.model';

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './guide.component.html',
    styleUrls    : ['./guide.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class GuideDashboardComponent implements OnInit
{
    displayedColumns: string[] = ['id', 'name', 'username', 'delete'];
    guideList: Guide[];
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
        private _guideService: GuideService
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
        this.getGuideList();
        this.form = this._formBuilder.group({
            guideUsername : ['', Validators.required],
            guideName  : ['', Validators.required]
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
    // @ private methods
    // -----------------------------------------------------------------------------------------------------


    private getGuideList(): void {
        this._guideService.getGuides().subscribe( (res) => {
            this.guideList = res;            
        });
    }

    public SubmitGuide(): void {
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.disableSaveButton = true;
        this._guideService.postGuide(this.form.value).subscribe((guide: Guide) => {
            this.guideList.push(guide);
            this.showSuccessMsg =  true;
            this.disableSaveButton = false;
        }, (error: any) => {
            this.showSuccessMsg = false;
            this.showErrorMsg = true;
            this.disableSaveButton = false;
        });
    }

    public deleteGuide(guideId: number): void {
        this._guideService.deleteGuide(guideId).subscribe((res: any) => { 
            if (res === true){
                this.guideList = this.guideList.filter((e) => e.guideId !== guideId);
            }
        });
    }

}


