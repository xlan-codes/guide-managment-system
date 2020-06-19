import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ICustomerRepository } from "../repository/interfaces/customer-repository.interface";
import { CUSTOMER } from "../repository/entity/CUSTOMER";
import { CustomerDto } from "../dto/customer.dto";
import { Utils } from "../utils/utils";
import { REVIEW } from "../repository/entity/REVIEW";
import { ReviewDetailDto, ReviewDto } from "../dto/review.dto";
import { REVIEWDETAIL } from "../repository/entity/REVIEWDETAIL";
import { IReviewDetailRepository } from "../repository/interfaces/review-detail-repository.interface";
import { IReviewRepository } from "../repository/interfaces/review-repository.interface";
import { ITourRepository } from "../repository/interfaces/tour-repository.interface";


@injectable()
export class CustomerService {

    @inject(TYPES.CustomerRepositoy)
    private customerRepo: ICustomerRepository;

    @inject(TYPES.TourRepositoy)
    private tourRepo: ITourRepository;

    @inject(TYPES.ReviewDetailRepositoy)
    private reviewDetailRepo: IReviewDetailRepository;

    @inject(TYPES.ReviewRepositoy)
    private reviewRepo: IReviewRepository;
    


    public async getAll(): Promise<Array<CustomerDto>> {

        const arr = await this.customerRepo.find();
        const customerList = Utils.toArrayOfType<CustomerDto, CUSTOMER>(arr, this.toCustomerDto);
        return customerList;
    }

    public async getOne(term: string): Promise<CUSTOMER> {
        const klient = await this.customerRepo.findOne(term);
        return (klient === undefined) ? undefined : klient;
    }

    public async createCustomer(customer: CustomerDto): Promise<CustomerDto> {
        const c = await this.customerRepo.create(this.toCustomerEntity(customer));
        customer.customerId = c.CUSTOMERID;
        return customer;
    }

    public async createReview(reviewDto: ReviewDto): Promise<ReviewDto> {
        const review = await this.reviewRepo.create(this.toReviewEntity(reviewDto));
        reviewDto.reviewId = review.REVIEWID;
        return reviewDto;
    }

    public async createReviewDetails(reviewDetailsDto: ReviewDetailDto): Promise<any> {
        const reviewDetail = await this.reviewDetailRepo.create(this.toReviewDetailEntity(reviewDetailsDto));
        reviewDetailsDto.reviewDetailId = reviewDetail.REVIEWID;
        return reviewDetailsDto;
    }

    public async getReviews(): Promise<Array<ReviewDto>> {
        const reviews = await this.reviewRepo.getReviews();
        const reviewList = Utils.toArrayOfType<ReviewDto, any>(reviews, this.toReviewDto);
        return await reviewList;
    }

    public async getReviewByExtIdTour(term: string): Promise<Array<ReviewDto>> {
        const tour = await this.tourRepo.findTourByExtId(term);
        if (tour !== undefined) {
            const reviews = await this.reviewRepo.findByIdTour(tour.TOURID);
            const reviewList = Utils.toArrayOfType<ReviewDto, any>(reviews, this.toReviewDto);
            return reviewList;
        } else {
            return await [];
        }
        
    }

    public async deletReview(reviewId: number): Promise<boolean> {
        const reviewDetailDeleted = await this.reviewDetailRepo.deleteByReviewID(reviewId);
        if(reviewDetailDeleted) {
            const review = await this.reviewRepo.findOne({REVIEWDETAILID: reviewId});
            const revieDeleted = await this.reviewRepo.delete(review);
            if(revieDeleted) {
                return revieDeleted;
            }
        }
        
        return  await Promise.resolve(false);
    }

    private toCustomerDto(customer: CUSTOMER): CustomerDto {
        return {
            customerId: customer.CUSTOMERID,
            customerUsername: customer.CUSTOMERUSERNAME,
            customerName: customer.CUSTOMERNAME,
            customerEmail: customer.CUSTOMEREMAIL
        } as CustomerDto;
    }

    private toCustomerEntity(customer: CustomerDto): CUSTOMER { // todo change this object to corrent
        return {
            CUSTOMERUSERNAME: customer.customerUsername,
            CUSTOMERNAME: customer.customerUsername
            // CUSTOMEREMAIL:customer.customerEmail
        } as CUSTOMER;
    }

    private toReviewDto(review: REVIEW | any): ReviewDto {

        return {
            reviewId: review.REVIEWID,
            tourId: review.TOURID,
            portalId: review.PORTALID,
            customerId: review.CUSTOMERID,
            createDate: review.CREATEDDATE,
            customerName: review.CUSTOMERNAME,
            portalName: review.PORTALNAME,
            ReviewUrl: review.ReviewUrl,
            ReviewTitle: review.REVIEWTITLE,
            reviewDetail: {
                reviewDetailId: review.REVIEWDETAILID,
                evaluation: review.EVALUATION,
                guideId: review.GUIDEID,
                guideRoleId: review.GUIDEROLEID,
                reviewId: review.REVIEWID,
                textEvaluation: review.TEXTEVALUATION,
                guideName: review.GUIDENAME
            } as ReviewDetailDto
        } as ReviewDto;
    }

    private toReviewEntity(review: ReviewDto): REVIEW{
        return {
            REVIEWID: review.reviewId,
            TOURID: review.tourId,
            PORTALID: review.portalId,
            CUSTOMERID: review.customerId,
            CREATEDDATE: review.createDate,
            ReviewUrl: review.ReviewUrl,
            REVIEWTITLE: review.ReviewTitle
        } as REVIEW;
    }

    // private toReviewDetailDto(reviewDetail: REVIEWDETAIL): ReviewDetailDto {
    //     return {
    //         reviewDetailId: reviewDetail.REVIEWDETAILID,
    //         evaluation: reviewDetail.EVALUATION,
    //         guideId: reviewDetail.GUIDEID,
    //         guideRoleId: reviewDetail.GUIDEROLEID,
    //         reviewId: reviewDetail.REVIEWID,
    //         textEvaluation: reviewDetail.TEXTEVALUATION
    //     } as ReviewDetailDto;
    // }

    private toReviewDetailEntity(reviewdDetail: ReviewDetailDto): REVIEWDETAIL{

        return {

            REVIEWDETAILID: reviewdDetail.reviewDetailId,
            EVALUATION: reviewdDetail.evaluation,
            GUIDEID: reviewdDetail.guideId,
            GUIDEROLEID: 1, // reviewdDetail.guideRoleId,
            REVIEWID: reviewdDetail.reviewId,
            TEXTEVALUATION: reviewdDetail.textEvaluation
        } as REVIEWDETAIL;
    }



}