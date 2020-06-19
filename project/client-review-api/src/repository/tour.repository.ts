
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { ITourRepository } from "./interfaces/tour-repository.interface";
import { TOUR } from "./entity/TOUR";

@injectable()
export class TourRepositoy extends BaseRepository<TOUR> implements ITourRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(TOUR);
    }

    public async findOne(term: string): Promise<TOUR> {

        const items = await this.repository.find({TOURCODE: term});
        return items[0];
    }

    public async findAll(): Promise<Array<TOUR>> {
        const items = await this.repository.find({order: {TOURNAME: 'ASC'}});

        return items;
    }

    public async findTourByExtId(ext: string): Promise<TOUR> {
        const items = await this.repository.find({EXT_ID: ext});
        return items[0];
    }
    
}