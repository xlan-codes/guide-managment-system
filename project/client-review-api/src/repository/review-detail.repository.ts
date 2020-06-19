
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { REVIEWDETAIL } from "./entity/REVIEWDETAIL";
import { IReviewDetailRepository } from "./interfaces/review-detail-repository.interface";


@injectable()
export class ReviewDetailRepositoy extends BaseRepository<REVIEWDETAIL> implements IReviewDetailRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(REVIEWDETAIL);
    }

    public async findOne(term: string): Promise<REVIEWDETAIL> {

        const items = await this.repository.find({REVIEWDETAILID: parseInt(term)});
        return items[0];
    }

    public async deleteByReviewID(reviewId: number): Promise<boolean> {
        const result = await this.repository.delete({REVIEWID: reviewId});
        if (result.affected){
            return await Promise.resolve(true);
        } else {
            return await Promise.resolve(false);
        }

    }
    
}