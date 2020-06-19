// import { GuideDto } from "./guide.dto";
// import { TourAppDto } from "./tour-app.dto";

export interface IExpense {
    ExpenseID: number;
    Reason: string;
    Value: number;
    GuideID: number;
    CheckinID: number;
    TourID: number;
    
    // tour: TourAppDto | null;
}

export class ExpenseDto implements IExpense {
    public CheckinID: number;
    public GuideID: number;
    public TourID: number;
    public ExpenseID: number;
    public Reason: string;
    public Value: number;
    // public Guide: GuideDto;
    // public tour: TourAppDto;

    
}