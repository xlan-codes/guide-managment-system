import { IRepository } from "./repository.interface";
import { REVIEW } from "../entity/REVIEW";


export interface IReviewRepository extends IRepository<REVIEW> {
    getReviews(): Promise<Array<REVIEW>>;
    findByIdTour(term: number): Promise<Array<REVIEW>>;
    getReportByGuideAndPortal(portalId: number, guideId: number):Promise<Array<REVIEW>>;
}