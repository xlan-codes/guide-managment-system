import { GUIDEROLE } from "../repository/entity/GUIDEROLE";
import { inject, injectable } from "inversify";
import { Utils } from "../utils/utils";
import { GUIDE } from "../repository/entity/GUIDE";
import { GuideDto } from "../dto/guide.dto";
import { IGuideRepository } from "../repository/interfaces/guide-repository.interface";
import { IGuideRoleRepository } from "../repository/interfaces/guide-role-repository.interface";
import { GuideRoleDto } from "../dto/guide-role.dto";
import { TYPES } from "../../types";
import { GuideReportDto } from "../dto/guide-report.dto";
import { GuideReviewDto } from "../dto/guide-review.dto";
import { GuideReview } from "../repository/entity/guide-review.entity";
import { IGuideReviewReposiotry } from "../repository/interfaces/guide-review-repository.interface";
// import { ITourRepository } from "../repository/interfaces/tour-repository.interface";
import { ITourAppRepository } from "../repository/interfaces/tour-app-repostitory.interface";
import { IReviewRepository } from "../repository/interfaces/review-repository.interface";
import { REVIEW } from "../repository/entity/REVIEW";
import { ReviewDetailDto, ReviewDto } from "../dto/review.dto";


@injectable()
export class GuideService {

    @inject(TYPES.GuideRepositoy)
    private guideRepo: IGuideRepository;
    @inject(TYPES.GuideRoleRepositoy)
    private guideRoleRepo: IGuideRoleRepository;
    @inject(TYPES.GuideReviewRepository)
    private guideReviewRepo: IGuideReviewReposiotry;
    @inject(TYPES.TourRepositoy)
    private tourRepo: ITourAppRepository;
    @inject(TYPES.ReviewRepositoy)
    private reviewRepo: IReviewRepository;



    public async find(expr?: any): Promise<Array<GuideDto>> {
        const arr = await this.guideRepo.find(expr);
        const guides = Utils.toArrayOfType<GuideDto, GUIDE>(arr, this.toGuideDto);
        return guides;
    }

    public async findOne(term: string): Promise<GuideDto> {
        const res = await this.guideRepo.findOne(term);
        const guide = this.toGuideDto(res);
        return (guide === undefined) ? undefined : guide;
    }

    public async getGuideRoles() {
        const arr = await this.guideRoleRepo.find();
        const guides = Utils.toArrayOfType<GuideRoleDto, GUIDEROLE>(arr, this.toGuideRoleDto);
        return guides;
    }

    public async saveGuide(guide:GuideDto) :Promise<any> {
        const guideEntity = this.toGuideEntity(guide);
        const g = await this.guideRepo.create(guideEntity);
        return g;
    }

    public async deleteGuide(guideId:string) : Promise<boolean> {
        const guide = await this.guideRepo.findOne({GUIDEID: guideId});
       const deleteResult = await this.guideRepo.delete(guide);
       return deleteResult;
    }

    public async getGuideReport(portalId: number, date: Date, guideId: number): Promise<Array<GuideReportDto | ReviewDto>> {
        let report = null;
        let reportDto = null;
        if(guideId) {
            report = await this.reviewRepo.getReportByGuideAndPortal(portalId, guideId); // review month
            reportDto =  Utils.toArrayOfType<ReviewDto, any>(report, this.toReviewDto);
        } else {
            report = await this.guideRepo.getReportByPortalAnDate(portalId, date.getMonth(), date.getFullYear()); // review month
            reportDto =  Utils.toArrayOfType<GuideReportDto, any>(report, this.toGuideReportDto);
            
        }

        return reportDto;
    }

    public async saveGuideReview(guideReviewDto: GuideReviewDto): Promise<GuideReviewDto> {
        const guideReview = await this.guideReviewRepo.create(await this.toGuideReviewEntity(guideReviewDto));
        return this.toGuideReviewDto(guideReview);
    }


    // private region

    private toGuideRoleDto(guideRole: GUIDEROLE): GuideRoleDto {
        return {
            roleId: guideRole.GUIDEROLEID,
            roleName: guideRole.ROLENMAE
        } as GuideRoleDto;
    }

    private async toGuideReviewEntity(guideReviewDto: GuideReviewDto): Promise<GuideReview> {
        const tour = await this.tourRepo.findOne({ExtID: guideReviewDto.TourID});
        return {
            GudieReviewID: guideReviewDto.GudieReviewID,
            tour: tour ? tour : null,
            MeetingPointHour: guideReviewDto.MeetingPointHour,
            DepartureTime: guideReviewDto.DepartureTime,
            BusStatus: guideReviewDto.BusStatus,
            DriverClothingStatus: guideReviewDto.DriverClothingStatus,
            WifiStatus: guideReviewDto.WifiStatus,
            MicrofonStatus: guideReviewDto.MicrofonStatus,
            LunchTimeStatus: guideReviewDto.LunchTimeStatus,
            WineTastingStatus: guideReviewDto.WineTastingStatus,
            GuideWineryStatus: guideReviewDto.GuideWineryStatus,
            AssistantGuideStatus: guideReviewDto.AssistantGuideStatus,
            GuidaStatus: guideReviewDto.GuidaStatus,
            RestorantStatus: guideReviewDto.RestorantStatus,
            Problems: guideReviewDto.Problems,
            ReturnHour: guideReviewDto.ReturnHour,
            SoldTours: guideReviewDto.SoldTours,
        } as GuideReview;
    }

    private toReviewDto(review: REVIEW | any): ReviewDto {

        return {
            reviewId: review.REVIEWID,
            tourId: review.TOURID,
            portalId: review.PORTALID,
            customerId: review.CUSTOMERID,
            createDate: review.CREATEDDATE,
            customerName: review.CUSTOMERNAME,
            portalName: review.PORTALNAME,
            ReviewUrl: review.ReviewUrl,
            ReviewTitle: review.REVIEWTITLE,
            reviewDetail: {
                reviewDetailId: review.rEVIEWDETAILs[0] ? review.rEVIEWDETAILs[0].REVIEWDETAILID : null,
                evaluation: review.rEVIEWDETAILs[0] ? review.rEVIEWDETAILs[0].EVALUATION : null,
                guideId: review.rEVIEWDETAILs[0] ? review.rEVIEWDETAILs[0].GUIDEID : null,
                guideRoleId: review.rEVIEWDETAILs[0] ? review.rEVIEWDETAILs[0].GUIDEROLEID : null,
                reviewId: review.rEVIEWDETAILs[0] ? review.rEVIEWDETAILs[0].REVIEWID : null,
                textEvaluation: review.rEVIEWDETAILs[0] ? review.rEVIEWDETAILs[0].TEXTEVALUATION : null,
                guideName: review.rEVIEWDETAILs[0] ? review.rEVIEWDETAILs[0].GUIDENAME : null
            } as ReviewDetailDto
        } as ReviewDto;
    }

    private  toGuideReviewDto(guideReview: GuideReview): GuideReviewDto {
        return {
            GudieReviewID: guideReview.GudieReviewID,
            TourID: guideReview.tour ? guideReview.tour.TourID : null,
            MeetingPointHour: guideReview.MeetingPointHour,
            DepartureTime: guideReview.DepartureTime,
            BusStatus: guideReview.BusStatus,
            DriverClothingStatus: guideReview.DriverClothingStatus,
            WifiStatus: guideReview.WifiStatus,
            MicrofonStatus: guideReview.MicrofonStatus,
            LunchTimeStatus: guideReview.LunchTimeStatus,
            WineTastingStatus: guideReview.WineTastingStatus,
            GuideWineryStatus: guideReview.GuideWineryStatus,
            AssistantGuideStatus: guideReview.AssistantGuideStatus,
            GuidaStatus: guideReview.GuidaStatus,
            RestorantStatus: guideReview.RestorantStatus,
            Problems: guideReview.Problems,
            ReturnHour: guideReview.ReturnHour,
            SoldTours: guideReview.SoldTours,
        } as GuideReviewDto;
    }

    private toGuideReportDto(guideReportEntity: any): GuideReportDto {
        return {
            CountReviews: guideReportEntity.COUNTEDREVIEWS,
            GuideFullname: guideReportEntity.GUIDENAME,
            GuideId: guideReportEntity.GUIDEID,
        } as GuideReportDto;
    }
    

    private toGuideDto(guide: GUIDE): GuideDto {
        const a =  {
            guideId: guide.GUIDEID,
            guideName: guide.GUIDENAME,
            guideUsername: guide.GUIDESURENAME
        } as GuideDto;

        return a;
    }

    private toGuideEntity( guide: GuideDto): GUIDE {
        return {
            GUIDENAME: guide.guideName,
            GUIDESURENAME: guide.guideUsername
        } as GUIDE;
    }
    

}