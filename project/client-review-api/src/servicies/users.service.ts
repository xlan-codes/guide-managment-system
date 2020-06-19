import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ISystemUserRepository } from "../repository/interfaces/system-user-repository.interface";
import { Utils } from "../utils/utils";
import { SystemUserEntity } from "../repository/entity/system-user.entity";
import { IUser, UserDto } from "../dto/user.dto";
// import { User } from "../models/user.model";


@injectable()
export class UserService {
    @inject(TYPES.SystemUserRepository)
    private repo: ISystemUserRepository;


    public async find(expr?: any): Promise<Array<UserDto>> {

        const arr = await this.repo.find(expr);
        const users = Utils.toArrayOfType<UserDto, SystemUserEntity>(arr, this.toUserDto);
        return users;
    }

    public async findOne(expr: any): Promise<UserDto> {
        const res = await this.repo.findOne(expr);
        return (res === undefined) ? undefined : this.toUserDto(res);
    }

    public async save(userDto: IUser): Promise<IUser> {
        const role = await this.repo.create(this.toUser(userDto));
        return this.toUserDto(role);            
    }

    public async getUserWithEmailAndPassword(email: string, password: string): Promise<UserDto> {
        const user = await this.repo.getUserByEmailandPassword(email, password);
        return (user === undefined) ? undefined : this.toUserDto(user);            
    }


    private toUserDto(systemUser: SystemUserEntity): UserDto {
        return {
            UserId: systemUser.UserId,
            UserName: systemUser.UserName,
            Name: systemUser.Name,
            Email: systemUser.Email,
            Password: systemUser.Password
        } as UserDto;
    }

    private toUser(systemUser: IUser): SystemUserEntity {
        return {
            UserId: systemUser.UserId,
            UserName: systemUser.UserName,
            Name: systemUser.Name,
            Email: systemUser.Email,
            Password: systemUser.Password
        } as SystemUserEntity;
    }
}