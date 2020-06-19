
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { IGuideRepository } from "./interfaces/guide-repository.interface";
import { GUIDE } from "./entity/GUIDE";

@injectable()
export class GuideRepositoy extends BaseRepository<GUIDE> implements IGuideRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(GUIDE);
    }

    public async findOne(term: string): Promise<GUIDE> {

        const items = await this.repository.find({GUIDESURENAME: term});
        return items[0];
    }

    public async findAll(): Promise<Array<GUIDE>> {
        const items = await this.repository.find();

        return items;
    }

    public async getReportByPortalAnDate(portalId: number, month: number, year: number): Promise<Array<any>> {
        return await this.repository.query(`SELECT SUM(RD.EVALUATION) AS COUNTEDREVIEWS, G.GUIDENAME, RD.GUIDEID FROM REVIEW R
                                            INNER JOIN REVIEWDETAIL RD ON R.REVIEWID = RD.REVIEWDETAILID
                                            INNER JOIN GUIDE G ON RD.GUIDEID = G.GUIDEID
                                            WHERE R.PORTALID = ${portalId} 
                                                AND MONTH(R.CREATEDDATE) = ${month} 
                                                AND YEAR(R.CREATEDDATE)= ${year} 
                                            GROUP BY RD.GUIDEID,
                                                    G.GUIDENAME 
                                            ORDER BY COUNTEDREVIEWS DESC`);
    }
    
}