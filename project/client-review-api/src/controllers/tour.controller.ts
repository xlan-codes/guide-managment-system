import { GET, Path } from "typescript-rest";
import { Tour } from "../models/TourModel";
import { TourService } from "../servicies/tour.service";
import { TYPES } from "../../types";
import { container } from "../../inversify.config";

@Path("/tour")
export class ToursController {

    protected tourService: TourService;

    constructor(){
        this.tourService = container.get<TourService>(TYPES.TourService);
    }


    @GET
    public async getTours(): Promise<Array<Tour>> {
        const tourList = await this.tourService.getAll();
        return tourList;
    }

}