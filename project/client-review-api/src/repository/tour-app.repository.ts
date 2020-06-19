import { TourApp } from "./entity/tour-app.entity";
import { ITourAppRepository } from "./interfaces/tour-app-repostitory.interface";
import { BaseRepository } from "./base-repository";
import { injectable } from "inversify";

@injectable()
export class TourAppRepository extends BaseRepository<TourApp> implements ITourAppRepository {

    
}