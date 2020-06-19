import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IGuideReviewReposiotry } from "../repository/interfaces/guide-review-repository.interface";
import { GuideReviewDto, IGuideReview } from "../dto/guide-review.dto";
import { Utils } from "../utils/utils";
import { GuideReview } from "../repository/entity/guide-review.entity";

@injectable()
export class GuideReviewService {

    @inject(TYPES.ExpenseRepository)
    private repository: IGuideReviewReposiotry;



    public async getAll(): Promise<Array<IGuideReview>> {

        const arr = await this.repository.find();
        const guideReviews = Utils.toArrayOfType<IGuideReview, GuideReview>(arr, this.toGuideReviewDto);
        return guideReviews;
    }

    public async find(filter: any): Promise<Array<IGuideReview>> {

        const arr = await this.repository.find(filter);
        const guideReviews = arr.map((e) => {
            return this.toGuideReviewDto(e);
        } );
        return guideReviews;
    }

    public async getOne(term: string): Promise<IGuideReview> {
        const guideReview = await this.repository.findOne(term);
        return (guideReview === undefined) ? undefined : this.toGuideReviewDto(guideReview);
    }

    public async saveExpense(guideReview: IGuideReview): Promise<IGuideReview> {
        const c = await this.repository.create(await this.toGuideReviewEntity(guideReview));
        return c as any;
    }
    
    public toGuideReviewDto(guideReview : GuideReview):IGuideReview {
        return null;
    }

    public async toGuideReviewEntity(expenseDto: GuideReviewDto): Promise<GuideReview> {
        return null;
    }

}
