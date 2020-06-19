
export interface IRole {
    roleId: number;
    roleName: string;
    roleDescription: string;
    roleTag: string;
}

export class RoleDto implements IRole{
    public roleId: number;
    public roleName: string;
    public roleDescription: string;
    public roleTag: string;
}
