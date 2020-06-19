import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { Utils } from "../utils/utils";
import { IPortalRepository } from "../repository/interfaces/portal-repository.interface";
import { PORTAL } from "../repository/entity/PORTAL";
import { PortalDto } from "../dto/portal.dto";
import { IReviewRepository } from "../repository/interfaces/review-repository.interface";
import { ReviewDto } from "../dto/review.dto";


@injectable()
export class PortalService {

    @inject(TYPES.PortalRepositoy)
    private portalRepo: IPortalRepository;

    @inject(TYPES.ReviewRepositoy)
    private reviewRepo: IReviewRepository;


    public async getAll(): Promise<Array<PortalDto>> {

        const arr = await this.portalRepo.find();
        const portals = Utils.toArrayOfType<PortalDto, PORTAL>(arr, this.toPortalDto);
        return portals;
    }

    public async getOne(term: string): Promise<PortalDto> {
        const res = await this.portalRepo.findOne(term);
        const portal = this.toPortalDto(res);
        return (portal === undefined) ? undefined : portal;
    }

    public async createPortal(portal: PortalDto): Promise<PortalDto> {
        const portalEntity = await this.portalRepo.create(this.toPortalEntity(portal));
        return this.toPortalDto(portalEntity);
    }

    public async deletePortal(portalCode: string): Promise<boolean> {
        const portal = await this.portalRepo.findOne({PORTALID: portalCode});
        const deletePortal = this.portalRepo.delete(portal);
        return deletePortal;
    }

    public async getReviews(protalId: number): Promise<ReviewDto> {
        this.reviewRepo.getReviews();
        return null;
    }



    // region private
    private toPortalDto(portal: PORTAL): PortalDto {
        return {
            portalId: portal.PORTALID,
            portalCode: portal.PORTALCODE,
            portalName: portal.PORTALNAME
        } as PortalDto;
    }

    private toPortalEntity(portal: PortalDto): PORTAL {
        return {
            PORTALCODE: portal.portalCode,
            PORTALNAME: portal.portalName
        } as PORTAL;
    }
    // end region

}