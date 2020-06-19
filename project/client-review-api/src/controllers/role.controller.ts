
import { TYPES } from "../../types";
import { container } from "../../inversify.config";
import { DELETE, GET, Path , PathParam, POST, QueryParam} from "typescript-rest";
import { IsInt } from "typescript-rest-swagger";
import { RoleService } from "../servicies/role.service";
import { IRole, RoleDto } from "../dto/role.dto";

@Path('roles')
export class RoleController {

    
    private service: RoleService;
    
    constructor() {
        this.service = container.get<RoleService>(TYPES.RoleService);
    }

    @GET
    public async get(@QueryParam("limit") @IsInt limit?: number, @QueryParam("offset") @IsInt offset?: number,  @QueryParam("filter") filter?: any): Promise<Array<IRole>> {
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
    public async post(roleDto: RoleDto): Promise<IRole> {
        return this.service.save(roleDto);
    }


    @GET
    @Path(':id')
    public async getOne(@PathParam("id") id: number): Promise<IRole> {
        return await this.service.findOne({RoleId: id});
    }

    @DELETE
    @Path(":roleId")
    public async delete(@PathParam("roleId") payment: number): Promise<boolean>{
        return null;
    }

}