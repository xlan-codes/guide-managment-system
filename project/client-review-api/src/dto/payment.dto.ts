import { GuideDto } from "./guide.dto";
import { TourAppDto } from "./tour-app.dto";


export interface IPayment {
    PaymentID:number;
    Value:number;
    guide: GuideDto | null;
    tour:TourAppDto | null;
    checkin:GuideDto | null;
    ClinetFullname: string;
    PaymentDate: Date;
    PaymentInvoicePhoto: string;
}

export class PaymentDto implements IPayment {
    public ClinetFullname: string;
    public PaymentDate: Date;
    public PaymentInvoicePhoto: string;
    public GuideID: number;
    public TourID: number;
    public CheckinID: number;
    public PaymentID: number;
    public Value: number;
    public guide: GuideDto;
    public tour: TourAppDto;
    public checkin: GuideDto;
    public PaymentTypeID: number | null;
}