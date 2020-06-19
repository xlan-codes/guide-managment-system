
export interface IUser {
    UserId: number;
    UserName: string;
    Name: string;
    Email: string;
    Password: string;
    RoleId: number | Array<number>;
}


export class UserDto implements IUser {


    public UserId: number;

    public UserName: string;

    public Name: string;

    public Email: string;

    public Password: string;

    public RoleId: number | Array<number>;

}