
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { IPortalRepository } from "./interfaces/portal-repository.interface";
import { PORTAL } from "./entity/PORTAL";

@injectable()
export class PortalRepositoy extends BaseRepository<PORTAL> implements IPortalRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(PORTAL);
    }

    public async findOne(term: string): Promise<PORTAL> {

        const items = await this.repository.find({PORTALCODE: term});
        return items[0];
    }

    public async findAll(): Promise<Array<PORTAL>> {
        const items = await this.repository.find();

        return items;
    }
    
}