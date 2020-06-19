import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {GUIDE} from "./GUIDE";
import { TourApp } from "./tour-app.entity";
import { PaymentType } from "./payment-type.entity";

@Entity("tblPayment",{schema:"dbo" } )
export class Payment {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"PaymentID"
        })
    public PaymentID:number;
        

    // @Column("nvarchar",{ 
    //     nullable:false,
    //     name:"Reason"
    //     })
    // public Reason:string;
        

    @Column("decimal",{ 
        nullable:false,
        precision:10,
        scale:2,
        name:"Value"
        })
    public Value:number;
        

   
    @ManyToOne(type=>GUIDE, guide=>guide.Payments,{  nullable:false, })
    @JoinColumn({ name:'GuideID'})
    public guide:GUIDE | null;


   
    @ManyToOne(type=>TourApp, tourApp=>tourApp.Payments,{  nullable:false, })
    @JoinColumn({ name:'TourID'})
    public tour:TourApp | null;


   
    @ManyToOne(type=>GUIDE, checkin=>checkin.CheckinPayments,{  nullable:false, })
    @JoinColumn({ name:'CheckinID'})
    public checkin:GUIDE | null;

    @ManyToOne(type=>PaymentType, paymentType=>paymentType.Payments,{  nullable:false, })
    @JoinColumn({ name:'PaymentTypeID'})
    public paymentType:PaymentType | null;
}
