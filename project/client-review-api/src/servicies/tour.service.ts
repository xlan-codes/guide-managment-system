import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { Tour } from "../models/TourModel";
import { Utils } from "../utils/utils";
import { TOUR } from "../repository/entity/TOUR";
import { ITourRepository } from "../repository/interfaces/tour-repository.interface";


@injectable()
export class TourService {

    @inject(TYPES.TourRepositoy)
    private customerRepo: ITourRepository;


    public async getAll(): Promise<Array<Tour>> {

        const arr = await this.customerRepo.find();
        const tours = Utils.toArrayOfType<Tour, TOUR>(arr, this.toTour);
        return tours;
    }

    public async getOne(term: string): Promise<Tour> {
        const res = await this.customerRepo.findOne(term);
        const tour = this.toTour(res);
        return (tour === undefined) ? undefined : tour;
    }


    private toTour(tour: TOUR): Tour {
        return {
            tourId: tour.TOURID,
            tourCode: tour.TOURCODE,
            tourName: tour.TOURNAME,
            extId: tour.EXT_ID
        } as Tour;
    }

}