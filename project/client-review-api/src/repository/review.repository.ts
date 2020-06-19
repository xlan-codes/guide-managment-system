
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { REVIEW } from "./entity/REVIEW";
import { IReviewRepository } from "./interfaces/review-repository.interface";


@injectable()
export class ReviewRepositoy extends BaseRepository<REVIEW> implements IReviewRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(REVIEW);
    }

    public async findByIdTour(term: number): Promise<Array<REVIEW>> {

        const items = await this.repository.manager.query(`SELECT R.REVIEWID, R.ReviewUrl, C.CUSTOMERNAME, G.GUIDENAME, RD.TEXTEVALUATION, RD.EVALUATION, R.CREATEDDATE, P.PORTALNAME FROM REVIEW AS R 
        INNER JOIN REVIEWDETAIL AS RD ON R.REVIEWID=RD.REVIEWID
        INNER JOIN CUSTOMER AS C ON C.CUSTOMERID = R.CUSTOMERID
        INNER JOIN PORTAL AS P ON P.PORTALID = R.PORTALID
        INNER JOIN GUIDE AS G ON G.GUIDEID = RD.GUIDEID WHERE TOURID=${term};`);
        return items;
    }

    public async getReviews(): Promise<Array<any>> {

        const a = await this.repository.manager.query(`SELECT R.REVIEWID, R.ReviewUrl, R.REVIEWTITLE, C.CUSTOMERNAME, G.GUIDENAME, RD.TEXTEVALUATION, RD.EVALUATION, R.CREATEDDATE, P.PORTALNAME FROM REVIEW AS R 
        INNER JOIN REVIEWDETAIL AS RD ON R.REVIEWID=RD.REVIEWID
        INNER JOIN CUSTOMER AS C ON C.CUSTOMERID = R.CUSTOMERID
        INNER JOIN PORTAL AS P ON P.PORTALID = R.PORTALID
        INNER JOIN GUIDE AS G ON G.GUIDEID = RD.GUIDEID;`);
        return await a;
    }

    public async getReportByGuideAndPortal(portalId: number, guideId: number): Promise<Array<REVIEW>> {
        const reviews = await this.repository.find({relations:['rEVIEWDETAILs'], where: {
            PORTALID: portalId,
            rEVIEWDETAILs: {
                GUIDEID: guideId
            }
        }});
        return reviews;
    }
    
}