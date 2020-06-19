
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { ISystemUserRepository } from "./interfaces/system-user-repository.interface";
import { SystemUserEntity } from "./entity/system-user.entity";



@injectable()
export class SystemUserRepository extends BaseRepository<SystemUserEntity> implements ISystemUserRepository {



    constructor(){
        super();
        super.repository = getConnection().getRepository(SystemUserEntity);
    }

    public async findOne(term: string): Promise<SystemUserEntity> {

        const items = await this.repository.find({UserId: parseInt(term, 0)});
        return items[0];
    }

    public async getUserByEmailandPassword(email: string, password: string): Promise<SystemUserEntity> {
       const user = await this.repository.findOne({Email: email, Password: password});
       return user;
    }
    
}