import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ManualService } from 'app/core/services/api/api-calls/manual/manual.service';
import { Manual } from 'app/core/models/manual.model';
import { TourService } from 'app/core/services/api/api-calls/tour/tour.service';
import { Tour } from 'app/core/models/tour.model';

@Component({
    selector     : 'tour-manual-dashboard',
    templateUrl  : './tour-manual.component.html',
    styleUrls    : ['./tour-manual.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TourManualDashboardComponent implements OnInit
{
    projects: any[];
    selectedProject: any;
    dataSource: any[];
    tourList: Array<Tour>;

    fileToUpload: File  = null;
    uploadProgress = 0;
    uploadComplete = false;
    uploadingProgressing = false;
    fileUploadSub: any;
    serverResponse: any;
    manuals: Array<Manual>;
    responseMessage: string =  null;

    @ViewChild('fileInput')
    fileInput: any;


    dateNow = Date.now();

    form: FormGroup;
    displayedColumns: string[] = ['id', 'manualGrup', 'description', 'download', 'delete'];
    filteredOptions: Observable<string[]>;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     * @param {ManualService} _manualService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _formBuilder: FormBuilder,
        private _manualService: ManualService,
        private _tourService: TourService
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
        this.form = this._formBuilder.group({
            tourId : ['', Validators.required],
            manualName  : ['', Validators.required],
            description  : ['', Validators.required],
            file: ['', Validators.required]
        });

        this.filteredOptions = this.form.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

        this.getTours();
        this.getManuals();
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toString().toLowerCase();

      return null;
    //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

    handleFileInput(files: FileList): void {
        const fileItem = files.item(0);
        this.fileToUpload = fileItem;
    }

    resetFileInput(): void {
        this.fileInput.nativeElement.value = '';
    }

    onSubmit(): Promise<void> {
        this.responseMessage = null;
        if (this.form.invalid) {
            return;
        }
        this._manualService.postManual(this.form.value, this.fileToUpload).subscribe((portal: any) => {
            this.responseMessage = `Manual Saved Successfully`;
        }, (error: any) => {
            this.responseMessage = `Guide not saved Successfully!`;
        });
    }

    async getManuals(): Promise<void> {
        this._manualService.getManuals().subscribe((res) => {
            this.manuals = res;
        });
    }

    async getTours(): Promise<void> {
        this._tourService.getTours().subscribe((res) => {
            this.tourList = res;
        });
    }

    async edit(manulaId: number): Promise<void> {
        
    }

    async delete(manulaId: number): Promise<void> {
        
    }
 
}


