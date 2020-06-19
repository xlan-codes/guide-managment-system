import { ISeoRepository } from "./interfaces/seo-repository.interface";
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { Seo } from "./entity/seo.entity";

export class SeoRepository extends BaseRepository<Seo> implements ISeoRepository {
    
    constructor(){
        super();
        super.repository = getConnection().getRepository(Seo);
    }
}