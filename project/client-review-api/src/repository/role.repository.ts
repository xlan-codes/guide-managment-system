
import { BaseRepository } from "./base-repository";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { Role } from "./entity/role.entity";
import { IRoleRepository } from "./interfaces/role-repository.interface";

@injectable()
export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(Role);
    }
}