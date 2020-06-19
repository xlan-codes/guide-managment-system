import {Column,Entity,OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Payment } from "./payment.entity";


@Entity("tblPaymentType",{schema:"dbo" } )
export class PaymentType {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"PaymentTypeID"
        })
    public PaymentTypeID:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"PaymentType"
        })
    public PaymentType:string;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"Description"
        })
    public Description:string | null;

    @OneToMany(type=>Payment, payment=>payment.paymentType)
    public Payments:Array<Payment>;
        
}
