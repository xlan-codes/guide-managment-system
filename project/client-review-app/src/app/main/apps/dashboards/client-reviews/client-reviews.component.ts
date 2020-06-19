import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TourService } from 'app/core/services/api/api-calls/tour/tour.service';
import { Tour } from 'app/core/models/tour.model';
import { Guide } from 'app/core/models/guide.model';
import { GuideService } from 'app/core/services/api/api-calls/guide/guide.service';
import { Portal } from 'app/core/models/portal.model';
import { PortalService } from 'app/core/services/api/api-calls/portal/portal.service';
import { ClientService } from 'app/core/services/api/api-calls/client/client.service';
import { ClientReview } from 'app/core/models/client-review.model';

class TempFormClass {
    public guideName: string;
    public protalName: string;
    public tourName: string;
}

@Component({
    selector     : 'analytics-dashboard',
    templateUrl  : './client-reviews.component.html',
    styleUrls    : ['./client-reviews.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AnalyticsDashboardComponent implements OnInit
{
    showSuccessMsg = false;
    showErrorMsg = false;
    disableSaveButton = false;

    tourName = new FormControl();
    guideName = new FormControl();
    portalName = new FormControl();

    form: FormGroup;
    tourList: Tour[];
    guideList: Array<Guide>;
    guideRoleList: Guide[];
    portalList: Portal[];
    test: any;

    fileToUpload: File  = null;
    uploadProgress = 0;
    uploadComplete = false;
    uploadingProgressing = false;

    filteredTours: Observable<Array<Tour>>;
    filteredGuides: Observable<Array<Guide>>;
    filteredPortals: Observable<Array<Portal>>;
    filteredRoles: Observable<Array<Tour>>;

    public temp: TempFormClass = new TempFormClass();
  
    
    @ViewChild('photoReviewInput')
    fileInput: any;

    @ViewChild('reviewForm')
    reviewForm: any;

    /**
     * Constructor
     *
     * @param {AnalyticsDashboardService} _analyticsDashboardService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _tourService: TourService,
        private _guideService: GuideService,
        private _portalService: PortalService,
        private _clinetService: ClientService,
        // public auth: AuthService
    )
    {

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
            clientUsername : ['', Validators.required],
            idTour  : ['', Validators.required],
            date   : ['', Validators.required],
            portalId  : ['', Validators.required],
            guideId    : [],
            rating    : ['', [Validators.required, Validators.min(1), Validators.max(5)]],
            ReviewUrl    : ['', [Validators.required]],
            commentRating: ['', Validators.required],
            commentTitle: ['', Validators.required],
            tourName: ['', Validators.required],
            // guideName: ['', Validators.required],
            portalName: ['', Validators.required],
        });

        
        this._getTourList();
        this._getGuideList();
        this._getPortalList();
        this._getGuideRolesList();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    private _filterTourList(value: string): Array<Tour> {
        if (value !== null) {
           const filterValue = value.toString().toLocaleLowerCase();
            const list = this.tourList.filter(option => option.tourName.toLocaleLowerCase().includes(filterValue));
            return list; 
        }
        
    }


    private _filterGuideList(value: string): Array<Guide> {
        const filterValue = value.toString().toLocaleLowerCase();
        const list = this.guideList.filter(option => option.guideName.toLocaleLowerCase().includes(filterValue) ||  option.guideUsername.toLocaleLowerCase().includes(filterValue));
        return list;
    }

    private _filterPortalList(value: string): Array<Portal> {
        const filterValue = value.toString().toLocaleLowerCase();
        const list = this.portalList.filter(option => option.portalName.toLocaleLowerCase().includes(filterValue) ||  option.portalName.toLocaleLowerCase().includes(filterValue));
        return list;
    }


    /**
     * get tour list
     */
    private _getTourList(): void
    {
        this._tourService.getTours().subscribe((tourList: Array<Tour>) => {
            this.tourList =  tourList;
            this.filteredTours = this.form.controls.tourName.valueChanges
                                            .pipe(
                                            startWith(''),
                                            map(value => this._filterTourList(value))
                                            );
        });
    }

    private _getGuideList(): void{
        this._guideService.getGuides().subscribe((guideList: Array<Guide>) => {
            this.guideList =  guideList;
            this.filteredGuides = this.form.controls.guideName.valueChanges
                                            .pipe(
                                            startWith(''),
                                            map(value => this._filterGuideList(value))
                                            );
                                            
        });
    }

    private _getPortalList(): void{
        this._portalService.getPortals().subscribe((portalList: Array<Portal>) => {
            this.portalList =  portalList;
            this.filteredPortals = this.form.controls.portalName.valueChanges
                                            .pipe(
                                            startWith(''),
                                            map(value => this._filterPortalList(value))
                                            );

        });
    }

    private _getGuideRolesList(): void{
        this._guideService.getGuides().subscribe((guideRoleList: Array<Guide>) => {
            this.guideRoleList =  guideRoleList;
        });
    }

    handleFileInput(files: FileList): void {
        const fileItem = files.item(0);
        this.fileToUpload = fileItem;
    }

    resetFileInput(): void {
        this.fileInput.nativeElement.value = '';
    }

    onSubmit(): void{
    
        if (this.form.invalid) {
            return;
        }
        this.showSuccessMsg = false;
        this.showErrorMsg = false;
        this.disableSaveButton = true;
        const review =  new ClientReview();
        review.ReviewUrl = this.form.controls.ReviewUrl.value;
        review.clientUsername = this.form.controls.clientUsername.value;
        review.commentRating = this.form.controls.commentRating.value;
        review.commentTitle = this.form.controls.commentTitle.value;
        review.date = new Date(this.form.controls.date.value._i.year, this.form.controls.date.value._i.month - 1, this.form.controls.date.value._i.date );
        review.guideId = this.form.controls.guideId.value;
        // review.guideName = this.form.controls.guideName.value;
        review.idTour = this.form.controls.idTour.value;
        review.portalId = this.form.controls.portalId.value;
        review.portalName = this.form.controls.portalName.value;
        review.rating = this.form.controls.rating.value;
        review.tourName = this.form.controls.tourName.value;

        this._clinetService.postReview(this.form.value, this.fileToUpload).subscribe((res: any) => {
            
            if (res.status) {
                if (res.status === 200) {
                    this.showSuccessMsg =  true;
                    this.disableSaveButton = false;
                    this.resetForm();
                } else {
                    this.showErrorMsg = true;
                }
            }
            
        }, (error: any) => {
            this.showSuccessMsg = false;
            this.showErrorMsg = true;
            this.disableSaveButton = false;
        });
    }


    resetForm(): void {
        this.form.controls.clientUsername.setValue('');
        this.form.controls.idTour.setValue('');
        this.form.controls.date.setValue('');
        this.form.controls.portalId.setValue('');
        this.form.controls.guideId.setValue('');
        this.form.controls.rating.setValue('');
        this.form.controls.ReviewUrl.setValue('');
        this.form.controls.commentRating.setValue('');
        this.form.controls.commentTitle.setValue('');
        this.form.controls.tourName.setValue('');
        this.form.controls.guideName.setValue('');
        this.form.controls.portalName.setValue('');
    }

    guideOptionSelected(guide: Guide): void {
        if (guide) {
            this.form.controls.guideId.setValue(guide.guideId);
         }
    }
    
    portalOptionSelected(portal: Portal): void {
        if (portal) {
            this.form.controls.portalId.setValue(portal.portalId);
        }
    }
    
    
    tourOptionSelected(tour: Tour): void {
        if (tour) {
            this.form.controls.idTour.setValue(tour.tourId);
        }
    }
    
    
}

