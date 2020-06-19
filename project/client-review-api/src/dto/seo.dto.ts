export interface ISeo {
    Id:number;
    SeoTitle:string;
    SeoDecription:string;
    SeoUrlPage:string;
    SeoSchema:string;
    SeoImage:string;
    idTour:number;
}

export class SeoDto implements ISeo {
    public Id: number;    
    public SeoTitle: string;
    public SeoDecription: string;
    public SeoUrlPage: string;
    public SeoSchema: string;
    public SeoImage: string;
    public idTour: number;
}
