
import { DELETE, GET, Path, PathParam, POST, QueryParam } from "typescript-rest";
import { SeoService } from "../servicies/seo.service";
import { IsInt } from "typescript-rest-swagger";
import { ISeo, SeoDto } from "../dto/seo.dto";
import { logger } from "../utils/logger";
import { container } from "../../inversify.config";
import { TYPES } from "../../types";

@Path("seo")
export class SeoController {

    private service: SeoService;

    constructor() {
        this.service = container.get<SeoService>(TYPES.SeoService);
    }

    @GET
    public async get(@QueryParam("limit") @IsInt limit?: number, @QueryParam("offset") @IsInt offset?: number,  @QueryParam("filter") filter?: any): Promise<Array<ISeo>> {
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
    public async post(seoDto:SeoDto): Promise<ISeo> {
        return this.service.save(seoDto);
    }


    @GET
    @Path('tour/:id')
    public async getOne(@PathParam("id") id: number): Promise<ISeo> {
        logger.info("fsdfsd");
        return await this.service.findOne({IdTour: id});
    }

    @DELETE
    @Path(":seoId")
    public async delete(@PathParam("tourId") tourId: number): Promise<boolean>{
        return null;
    }

}