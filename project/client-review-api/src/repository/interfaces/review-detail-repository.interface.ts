import { IRepository } from "./repository.interface";
import { REVIEWDETAIL } from "../entity/REVIEWDETAIL";


export interface IReviewDetailRepository extends IRepository<REVIEWDETAIL> {
    deleteByReviewID(reviewId: number): Promise<boolean>;

}