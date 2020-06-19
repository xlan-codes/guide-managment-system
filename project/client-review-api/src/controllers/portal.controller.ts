import { container } from "../../inversify.config";
import { TYPES } from "../../types";
import { PortalDto } from "../dto/portal.dto";
import { PortalService } from "../servicies/portal.service";
import { DELETE, GET, Path, PathParam, POST } from "typescript-rest";
import { ReviewDto } from "../dto/review.dto";

// @Security("Bearer")
@Path('portals')
export class PortalController {
    private portalService: PortalService;
    
    constructor() {
        this.portalService = container.get<PortalService>(TYPES.PortalService);
    }

    @GET
    public async getAllPortals(): Promise<Array<PortalDto>> {
        const portalList = await this.portalService.getAll();
        return portalList;
    }

    @POST
    public async postPortal(portal: PortalDto): Promise<PortalDto> {
        const newPortal = await this.portalService.createPortal(portal);
        return await newPortal;
    }

    @DELETE
    @Path(":portalCode")
    public async deletePortal(@PathParam("portalCode") portalCode: string): Promise<boolean> {
        const portalDeleted = await this.portalService.deletePortal(portalCode);
        return await portalDeleted;
    }

    @GET
    @Path("get-reviews/:protalId")
    public async getReviews(@PathParam('protalId') protalId: number): Promise<Array<ReviewDto>> {
        return null;
    }
}