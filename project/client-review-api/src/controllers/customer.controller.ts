import { CustomerService } from "../servicies/customer.service";
import { container } from "../../inversify.config";
import { TYPES } from "../../types";
import { DELETE, FileParam, GET, Param, Path, PathParam, POST } from "typescript-rest";
import { CustomerDto } from "../dto/customer.dto";
// import * as fs from 'fs';
// import { logger } from "../utils/logger";
import { ReviewDetailDto, ReviewDto } from "../dto/review.dto";
require('dotenv').config();

@Path('customers')
export class CustomerController {
    
    private customerService: CustomerService;
    
    constructor() {
        this.customerService = container.get<CustomerService>(TYPES.CustomerService);
    }

    @GET
    public async getAllCustomers(): Promise<Array<CustomerDto>> {
        const customerList = await this.customerService.getAll();
        return customerList;
    }

    // @POST
    // public async postCustomer(customer: CustomerDto): Promise<CustomerDto> {
    //     return await customer;
    // }

    // change param to client 
    @POST
    public async postReview(@FileParam('photoReviewFile') photoReviewFile: Express.Multer.File, @Param('clientReview') clientReview: any){

        const clientReviewReq = JSON.parse(clientReview);
        
        const customer = await this.customerService.createCustomer({
            customerUsername: clientReviewReq.clientUsername
        } as CustomerDto);

        const review = await this.customerService.createReview({
            tourId: clientReviewReq.idTour,
            portalId: clientReviewReq.portalId,
            customerId: customer.customerId,
            createDate: new Date(clientReviewReq.date),
            ReviewUrl: clientReviewReq.ReviewUrl,
            ReviewTitle: clientReviewReq.ReviewTitle
        } as ReviewDto);

        for (const guideId of clientReviewReq.guideId) {
            await this.customerService.createReviewDetails({
                evaluation: clientReviewReq.rating,
                guideId: guideId,
                reviewId: review.reviewId,
                textEvaluation: clientReviewReq.commentRating,
                // imgEvaluation: fileName
            } as ReviewDetailDto);
        }
        return review;
    }


    @GET
    @Path('getReviews')
    public async getReviews(): Promise<Array<ReviewDto>> {

        const reviews = await this.customerService.getReviews();
        return await reviews;
    }

    @GET
    @Path('/getReviewsBy/:tourId')
    public async getReviewsById(@PathParam('tourId') tourId: number): Promise<Array<ReviewDto>> {

        const reviews = await this.customerService.getReviewByExtIdTour(tourId.toString());
        return await reviews;
    }

    @DELETE
    @Path('/deleteReviews/:reviewId')
    public async deleteReview(@PathParam('reviewId') reviewId: number): Promise<boolean> {
        const deleteReview = await this.customerService.deletReview(reviewId);
        return await Promise.resolve(deleteReview);
    }

}