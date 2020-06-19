import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ISeoRepository } from "../repository/interfaces/seo-repository.interface";
import { Utils } from "../utils/utils";
import { ISeo, SeoDto } from "../dto/seo.dto";
import { Seo } from "../repository/entity/seo.entity";

@injectable()
export class SeoService {
    
    @inject(TYPES.SeoRepository)
    private repo: ISeoRepository;


    public async find(expr?: any): Promise<Array<ISeo>> {

        const arr = await this.repo.find(expr);
        const users = Utils.toArrayOfType<SeoDto, Seo>(arr, this.toSeoDto);
        return users;
    }

    public async findOne(term: any): Promise<ISeo> {
        const res = await this.repo.findOne(term);
        return (res === undefined) ? undefined : this.toSeoDto(res);
    }

    public async save(seoDto: ISeo): Promise<ISeo> {
        const role = await this.repo.create(this.toSeoEntity(seoDto));
        return this.toSeoDto(role);            
    }
    public async update(seoDto: ISeo): Promise<boolean> {
        return await this.repo.update(this.toSeoEntity(seoDto));         
    }

    public async delete(seoId: number): Promise<boolean> {
        const role = await this.repo.findOne({Id: seoId});
        return await this.repo.delete(role);           
    }


    private toSeoDto(seo: Seo): ISeo {
        return {
            SeoTitle: seo.SeoTitle,
            SeoDecription: seo.SeoDecription,
            SeoUrlPage: seo.SeoUrlPage,
            SeoSchema: seo.SeoSchema,
            SeoImage: seo.SeoImage,
            idTour: seo.IdTour
        } as ISeo;
    }

    private toSeoEntity(seoDto: ISeo): Seo {
        return {
            SeoTitle: seoDto.SeoTitle,
            SeoDecription: seoDto.SeoDecription,
            SeoUrlPage: seoDto.SeoUrlPage,
            SeoSchema: seoDto.SeoSchema,
            SeoImage: seoDto.SeoImage,
            // IdTour: seoDto.IdTour
        } as Seo;
    }
}