export class ReviewDetailDto {

    public reviewDetailId: number;
    
    public evaluation: number;
    
    public guideId: number;
    
    public guideRoleId: number;
    
    public reviewId: number;
    
    public textEvaluation: string;
    
    public imgEvaluation: string;
    
    public guideName: string;
    
}

export class ReviewDto {

    public reviewId: number;

    public tourId: number;

    public portalId: number;

    public portalName: string;
    
    public tourName: string;

    public customerId: number;

    public createDate: Date;

    public reviewDetail: ReviewDetailDto;

    public customerName: string;

    public ReviewTitle: string;

    public ReviewUrl: string;

}

export class ClientReview {
    ReviewUrl: string;
    clientUsername: string;
    commentRating: string;
    commentTitle: string;
    date: Date;
    guideId: Array<number>;
    // guideName: string;
    idTour: number;
    portalId: number;
    portalName: string;
    rating: number;
    tourName: string;
    // ReviewUrl: string;
}
