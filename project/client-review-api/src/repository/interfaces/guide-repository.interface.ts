import { GUIDE } from "../entity/GUIDE";
import { IRepository } from "./repository.interface";

export interface IGuideRepository extends IRepository<GUIDE> {
    getReportByPortalAnDate(portalId: number, month: number, year: number): Promise<Array<any>>;
    
}