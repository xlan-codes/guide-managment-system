import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IRole, RoleDto } from "../dto/role.dto";
import { Role } from "../repository/entity/role.entity";
import { Utils } from "../utils/utils";
import { IRoleRepository } from "../repository/interfaces/role-repository.interface";

@injectable()
export class RoleService {
    @inject(TYPES.RoleRepository)
    private repo: IRoleRepository;


    public async find(expr?: any): Promise<Array<IRole>> {

        const arr = await this.repo.find(expr);
        const users = Utils.toArrayOfType<RoleDto, Role>(arr, this.toRoleDto);
        return users;
    }

    public async findOne(term: any): Promise<IRole> {
        const res = await this.repo.findOne(term);
        return (res === undefined) ? undefined : this.toRoleDto(res);
    }

    public async save(roleDto: IRole): Promise<IRole> {
        const role = await this.repo.create(this.toRoleEntity(roleDto));
        return this.toRoleDto(role);            
    }
    public async update(roleDto: IRole): Promise<boolean> {
        return await this.repo.update(this.toRoleEntity(roleDto));         
    }

    public async delete(roleId: number): Promise<boolean> {
        const role = await this.repo.findOne({RoleId: roleId});
        return await this.repo.delete(role);           
    }


    private toRoleDto(role: Role): IRole {
        return {
            roleId: role.RoleId,
            roleName: role.RoleName,
            roleDescription: role.RoleDescription,
            roleTag: role.RoleTag,
        } as IRole;
    }

    private toRoleEntity(roleDto: IRole): Role {
        return {
            RoleId: roleDto.roleId,
            RoleName: roleDto.roleName,
            RoleDescription: roleDto.roleDescription,
            RoleTag: roleDto.roleTag,
        } as Role;
    }
}
