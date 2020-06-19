import { BaseRepository } from "./base-repository";
import { GuideReview } from "./entity/guide-review.entity";
import { IGuideReviewReposiotry } from "./interfaces/guide-review-repository.interface";
import { getConnection } from "typeorm";

export class GuideReviewRepository extends BaseRepository<GuideReview> implements IGuideReviewReposiotry {
    constructor(){
        super();
        super.repository = getConnection().getRepository(GuideReview);
    }

}
