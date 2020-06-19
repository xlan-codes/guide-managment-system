
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { IGuideRoleRepository } from "./interfaces/guide-role-repository.interface";
import { GUIDEROLE } from "./entity/GUIDEROLE";

@injectable()
export class GuideRoleRepositoy extends BaseRepository<GUIDEROLE> implements IGuideRoleRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(GUIDEROLE);
    }

    public async findOne(term: string): Promise<GUIDEROLE> {

        const items = await this.repository.find({ROLENMAE: term});
        return items[0];
    }

    public async findAll(): Promise<Array<GUIDEROLE>> {
        const items = await this.repository.find();

        return items;
    }
    
}