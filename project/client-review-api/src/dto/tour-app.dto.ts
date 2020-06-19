import { IExpense } from "./expense.dto";
import { IPayment } from "./payment.dto";


export interface ITourApp {
    TourID:number;
    TourName:string;
    ExtID:string;
    Expenses:Array<IExpense>;
    Payments:Array<IPayment>;
}

export class TourAppDto implements ITourApp {
    public TourID: number;
    public TourName: string;
    public ExtID: string;
    public Expenses: Array<IExpense>;
    public Payments: Array<IPayment>;

    
}