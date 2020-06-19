import { UserService } from "../servicies/users.service";
import { container } from "../../inversify.config";
import { TYPES } from "../../types";
import { DELETE, GET, Path, PathParam, POST, QueryParam } from "typescript-rest";
import { IsInt } from "typescript-rest-swagger";
import { IUser, UserDto } from "../dto/user.dto";


export class UserController {

    private service: UserService;

    constructor() {
        this.service = container.get<UserService>(TYPES.UserService);
    }


    @GET
    public async get(@QueryParam("limit") @IsInt limit?: number, @QueryParam("offset") @IsInt offset?: number,  @QueryParam("filter") filter?: any): Promise<Array<IUser>> {
        if (offset && filter) {
            const filterObj =  JSON.parse(filter);
            return await this.service.find({take: limit, skip: offset, where: filterObj});
        } else if(filter) {
            const filterObj =  JSON.parse(filter);
            return await this.service.find({where: filterObj});
        } else if(offset) {
            return await this.service.find({take: limit, skip: offset});
        } else {
            return await this.service.find();
        }
    }

    @POST
    public async post(user: UserDto): Promise<IUser> {
        return this.service.save(user);
    }


    @GET
    @Path(':id')
    public async getOne(@PathParam("id") id: number): Promise<IUser> {
        return await this.service.findOne({UserId: id});
    }

    @DELETE
    @Path(":userId")
    public async delete(@PathParam("userId") payment: number): Promise<boolean>{
        return null;
    }
}