import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {GUIDE} from "./GUIDE";
import { TourApp } from "./tour-app.entity";

@Entity("tblExpenses",{schema:"dbo" } )
export class Expense {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"ExpenseID"
        })
    public ExpenseID:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"Reason"
        })
    public Reason:string;
        

    @Column("decimal",{ 
        nullable:true,
        precision:10,
        scale:2,
        name:"Value"
        })
    public Value:number | null;
        

   
    @ManyToOne(type=>GUIDE, guide=>guide.Expenses,{  nullable:false, })
    @JoinColumn({ name:'GuideID'})
    public guide:GUIDE | null;


   
    @ManyToOne(type=>TourApp, tourApp=>tourApp.Expenses,{  nullable:false, })
    @JoinColumn({ name:'TourID'})
    public tour:TourApp | null;

}
