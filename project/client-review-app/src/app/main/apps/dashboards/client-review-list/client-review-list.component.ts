
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {MatPaginator, MatSort, MatTabGroup} from '@angular/material';
import { ClientService } from 'app/core/services/api/api-calls/client/client.service';
import { ClientReview, ReviewDto } from 'app/core/models/client-review.model';
import { Tour } from 'app/core/models/tour.model';
import { Guide } from 'app/core/models/guide.model';
import { Portal } from 'app/core/models/portal.model';
import { TourService } from 'app/core/services/api/api-calls/tour/tour.service';
import { GuideService } from 'app/core/services/api/api-calls/guide/guide.service';
import { PortalService } from 'app/core/services/api/api-calls/portal/portal.service';


@Component({
    selector     : 'client-review-list',
    templateUrl  : './client-review-list.component.html',
    styleUrls    : ['./client-review-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ClientReviewListComponent implements OnInit
{
    showSuccessMsg = false;
    showErrorMsg = false;
    disableSaveButton = false;

    tourName = new FormControl();
    guideName = new FormControl();
    portalName = new FormControl();

    form: FormGroup;
    tourList: Tour[];
    guideList: Guide[];
    guideRoleList: Guide[];
    portalList: Portal[];

    fileToUpload: File  = null;
    uploadProgress = 0;
    uploadComplete = false;
    uploadingProgressing = false;

    filteredTours: Observable<Array<Tour>>;
    filteredGuides: Observable<Array<Guide>>;
    filteredPortals: Observable<Array<Portal>>;
    filteredRoles: Observable<Array<Tour>>;
  
    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
    
    @ViewChild('photoReviewInput')
    fileInput: any;

    @ViewChild('reviewForm')
    reviewForm: any;


    // displayedColumns: string[] = ['id', 'clientName', 'rating', 'text', 'portal', 'guide', 'data', 'edit', 'delete'];
    displayedColumns: string[] = ['clientName', 'rating', 'text', 'portal', 'guide', 'data', 'edit', 'delete'];
    reviewsSource: Array<ReviewDto>;

    clientReviews: ClientReview[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    private _tourService: TourService,
    private _guideService: GuideService,
    private _portalService: PortalService,
    private _clientService: ClientService,
  ) {
    this.getReviews();
  }

  ngOnInit(): void {

    this.form = this._formBuilder.group({
        clientUsername : ['', Validators.required],
        idTour  : ['', Validators.required],
        date   : ['', Validators.required],
        portalId  : ['', Validators.required],
        guideId    : ['', Validators.required],
        rating    : ['', [Validators.required, Validators.min(1), Validators.max(5)]],
        ReviewUrl    : ['', [Validators.required]],
        commentRating: ['', Validators.required],
        commentTitle: ['', Validators.required],
        tourName: ['', Validators.required],
        guideName: ['', Validators.required],
        portalName: ['', Validators.required],
    });
    
    this._getTourList();
    this._getGuideList();
    this._getPortalList();
    this._getGuideRolesList();
  }

  applyFilter(filterValue: string): void {
  }


 private getReviews(): void {
    this._clientService.getClientReviews().subscribe((res) => {
        this.reviewsSource = res;
    }, (error) => {

    });
 }

 
    delete(reviewId: number): void {
            this._clientService.deleteReview(reviewId).subscribe((res: boolean) => {
                if (res) {
                    this.reviewsSource = this.reviewsSource.filter((e) => e.reviewId !== reviewId);
                }
            });
    }

    edit(reviewId: number): void {
        const s = this.reviewsSource.filter((e) => e.reviewId === reviewId);
        const review = s[0];
        this.form.controls.clientUsername.setValue(review.customerName);
        this.form.controls.idTour.setValue(review.tourId);
        this.form.controls.date.setValue(review.createDate);
        this.form.controls.portalId.setValue(review.portalId);
        this.form.controls.guideId.setValue(review.reviewDetail.guideRoleId);
        this.form.controls.rating.setValue(review.reviewDetail.evaluation);
        this.form.controls.ReviewUrl.setValue(review.ReviewUrl);
        this.form.controls.commentRating.setValue(review.reviewDetail.textEvaluation);
        this.form.controls.commentTitle.setValue(review.ReviewTitle);
        const tour = this.tourList.filter((e) => e.tourId !== review.tourId);
        const guide = this.guideList.filter((e) => e.guideId !== review.reviewDetail.guideId);
        const portal = this.portalList.filter((e) => e.portalId !== review.portalId);
        this.form.controls.tourName.setValue(tour[0].tourName);
        this.form.controls.guideName.setValue(guide[0].guideName);
        this.form.controls.portalName.setValue(portal[0].portalName);
        this.tabGroup.selectedIndex = 1;
    }

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
            this.filteredGuides = this.form.controls.guideName.valueChanges.pipe(startWith(''),
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
        this._clientService.postReview(this.form.value, this.fileToUpload).subscribe((res: any) => {
            console.log(res);
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
        this.form.controls.tourName.reset('');
        this.form.controls.guideName.reset('');
        this.form.controls.portalName.reset('');
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

