
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { IManualRepository } from "./interfaces/manual-repository.interface";
import { MANUAL } from "./entity/MANUAL";

@injectable()
export class ManualRepositoy extends BaseRepository<MANUAL> implements IManualRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(MANUAL);
    }
}