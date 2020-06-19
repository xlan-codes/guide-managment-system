import { Column,Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./expense.entity";
import { Payment } from "./payment.entity";
import { GuideReview } from "./guide-review.entity";


@Entity("tblTourApp",{schema:"dbo" } )
export class TourApp {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"TourID"
        })
    public TourID:number;
        

    @Column("varchar",{ 
        nullable:false,
        name:"TourName"
        })
    public TourName:string;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"ExtID"
        })
    public ExtID:string;
        

   
    @OneToMany(type=>Expense, expense=>expense.tour)
    public Expenses:Array<Expense>;
    

   
    @OneToMany(type=>Payment, payment=>payment.tour)
    public Payments:Array<Payment>;


    @OneToMany(type=>GuideReview, tblGuideReview=>tblGuideReview.tour)
    public GuideReviews:Array<GuideReview>;
    
}
