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

    public tourId:number;

    public portalId:number;

    public customerId:number;

    public createDate:Date;

    public reviewDetail: ReviewDetailDto;

    public customerName: string;
    
    public portalName: string;

    public ReviewUrl: string;

    public ReviewTitle: string;

}