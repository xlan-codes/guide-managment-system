import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { MANUAL } from "../repository/entity/MANUAL";
import { ManualDto } from "../dto/manual.dto";
import { Utils } from "../utils/utils";
import { IManualRepository } from "../repository/interfaces/manual-repository.interface";


@injectable()
export class ManualService {

    @inject(TYPES.ManualRepositoy)
    private manualRepo: IManualRepository;


    public async getAll(): Promise<Array<ManualDto>> {

        const arr = await this.manualRepo.find();
        const manualList = Utils.toArrayOfType<ManualDto, MANUAL>(arr, this.toManualDto);
        return manualList;
    }

    public async getOne(term: string): Promise<MANUAL> {
        const klient = await this.manualRepo.findOne(term);
        return (klient === undefined) ? undefined : klient;
    }

    public async createManual(manual: ManualDto): Promise<ManualDto> {
        const c = await this.manualRepo.create(this.toManualEntity(manual));
        return await this.toManualDto(c);
    }

    private toManualDto(manual: MANUAL): ManualDto {
        return {
            manualId: manual.ID,
            tourId: manual.TOURID,
            manualName: manual.MANUALNAME,
            description: manual.TOURDESCRIPTION,
            tourDoc: manual.TOURDOC
        } as ManualDto;
    }

    private toManualEntity(manual: ManualDto): MANUAL {
        return {
            ID: manual.manualId,
            TOURID: manual.tourId,
            MANUALNAME: manual.manualName,
            TOURDESCRIPTION: manual.description,
            TOURDOC: manual.tourDoc
        } as MANUAL;
    }

}