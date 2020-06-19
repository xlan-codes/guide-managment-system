import { DELETE, GET, Path, PathParam, POST, QueryParam } from "typescript-rest";
import { IsInt } from "typescript-rest-swagger";
import { container } from "../../inversify.config";
import { GuideDto } from "../dto/guide.dto";
import { GuideService } from "../servicies/guide.service";
import { TYPES } from "../../types";
import { GuideRoleDto } from "../dto/guide-role.dto";
import { GuideReviewDto } from "../dto/guide-review.dto";
import { GuideReportDto } from "../dto/guide-report.dto";
import { ReviewDto } from "../dto/review.dto";


@Path('guides')
export class GuideController {

    
    private service: GuideService;
    
    constructor() {
        this.service = container.get<GuideService>(TYPES.GuideService);
    }

    @GET
    public async get(@QueryParam("limit") @IsInt limit?: number, @QueryParam("offset") @IsInt offset?: number,  @QueryParam("filter") filter?: any): Promise<Array<GuideDto>> {
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
    public async post(guide:GuideDto): Promise<any> {
        const guideRes = await this.service.saveGuide(guide);
        return guideRes;
    }


    @GET
    @Path('roles')
    public async getRoles(): Promise<Array<GuideRoleDto>> {
        const guideRoleList = await this.service.getGuideRoles();
        return guideRoleList;
    }

    @DELETE
    @Path(":guideId")
    public async delete(@PathParam("guideId") guide: number): Promise<boolean>{
        const guideDeleted = await this.service.deleteGuide(guide.toString());
        return guideDeleted;
    }

    @POST
    @Path('review')
    public async postReview(guideReviewDto: GuideReviewDto): Promise<GuideReviewDto> {
        const savedGuideReviewDto = this.service.saveGuideReview(guideReviewDto);
        return savedGuideReviewDto;
    }

    @GET
    @Path('review')
    public async getReviews(): Promise<GuideReviewDto> {
        return null;
    }

    @GET
    @Path('guide-review-by-portal')
    public async getReviewsByPortal(@QueryParam('portalId') portalId: number, @QueryParam('date') date?: Date, @QueryParam('guideId') guideId?: number): Promise<Array<GuideReportDto | ReviewDto>> {
        if(!date) {
            date = new Date();
        } else {
            date = new Date(date);
        } 
        return await this.service.getGuideReport(portalId, date, guideId);
    }
    

}
