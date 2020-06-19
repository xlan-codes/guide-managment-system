import { container } from "../../inversify.config";
import { TYPES } from "../../types";
import {  ContextRequest, DELETE, FileParam, GET, Param, Path, PathParam, POST, Return } from "typescript-rest";
import * as fs from 'fs';
import { logger } from "../utils/logger";
import { ManualDto } from "../dto/manual.dto";
import { ManualService } from "../servicies/manual.service";
import { createHttpError } from "../utils/httpErrors";

@Path('manuals')
export class ManualController {
    private manualService: ManualService;
    
    constructor() {
        this.manualService = container.get<ManualService>(TYPES.ManualService);
    }

    @GET
    public async getAllManuals(): Promise<Array<ManualDto>> {
        const manualList = await this.manualService.getAll();
        return manualList;
    }

    @POST
    public async postManual(@FileParam("myFile") file: Express.Multer.File, @Param("manual") manualData: any): Promise<any> {
        if (file){
            const fileName = file.originalname;
            const manual = JSON.parse(manualData) as ManualDto;
            manual.tourDoc = fileName;
    
            await fs.writeFile(process.env.MANUAL_DIR + '/' +fileName,file.buffer,  function(err) {
                if (err) {
                    logger.error(err);
                }       
            });
    
            const manualDto = await this.manualService.createManual(manual);
    
            return await manualDto;
        } else {
            return createHttpError(400, 'empty file');
        }

    }

    @GET
    @Path('download/:fileName')
    public async download(@PathParam('fileName') fileName: string): Promise<any> {

        if (fileName === null || fileName === undefined || fileName === '' || !fs.existsSync(process.env.MANUAL_DIR + fileName)) {
            throw createHttpError(404, 'File not found');
        }
        return new Return.DownloadResource(process.env.MANUAL_DIR, fileName);
    }

    @DELETE
    public async delete(@ContextRequest test: any): Promise<Boolean> {
        return Promise.resolve(true);
    }
}
