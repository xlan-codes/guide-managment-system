import { IRepository } from "./repository.interface";
import { TOUR } from "../entity/TOUR";


export interface ITourRepository extends IRepository<TOUR> {

    findTourByExtId(ext: string): Promise<TOUR>;
}