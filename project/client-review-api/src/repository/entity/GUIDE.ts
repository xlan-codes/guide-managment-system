import {Column,Entity,OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Payment } from "./payment.entity";
import { Expense } from "./expense.entity";
// import {REVIEWDETAIL} from "./REVIEWDETAIL";


@Entity("GUIDE",{schema:"dbo" } )
export class GUIDE {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"GUIDEID"
        })
    public GUIDEID:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"GUIDENAME"
        })
    public GUIDENAME:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"GUIDESURENAME"
        })
    public GUIDESURENAME:string | null;
        
    
    @Column("varchar",{ 
        nullable:true,
        length:60,
        name:"SmartNccUsername"
        })
    public SmartNccUsername:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:60,
        name:"TagList"
        })
    public TagList:string | null;
   
    // @OneToMany(type=>REVIEWDETAIL, rEVIEWDETAIL=>rEVIEWDETAIL.gUIDE,{ onUpdate: 'CASCADE' })
    // rEVIEWDETAILs:REVIEWDETAIL[];

    @OneToMany(type=>Payment, payment=>payment.guide)
    public Payments:Array<Payment>;
    

   
    @OneToMany(type=>Payment, payment=>payment.checkin)
    public CheckinPayments:Array<Payment>;

    @OneToMany(type=>Expense, expense=>expense.guide)
    public Expenses: Array<Expense>;
    
    
}
