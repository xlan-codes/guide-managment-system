import { SystemUserEntity } from "../entity/system-user.entity";
import { IRepository } from "./repository.interface";

export interface ISystemUserRepository extends  IRepository<SystemUserEntity> {

    getUserByEmailandPassword(email: string, password: string): Promise<SystemUserEntity>;

}