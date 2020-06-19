import {Column,Entity,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {REVIEW} from "./REVIEW";


@Entity("CUSTOMER",{schema:"dbo" } )
export class CUSTOMER {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"CUSTOMERID"
        })
    CUSTOMERID:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"CUSTOMERUSERNAME"
        })
    CUSTOMERUSERNAME:string;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"CUSTOMERNAME"
        })
    CUSTOMERNAME:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"CUSTOMEREMAIL"
        })
    CUSTOMEREMAIL:string | null;
        

   
    @OneToMany(type=>REVIEW, rEVIEW=>rEVIEW.cUSTOMER,{ onUpdate: 'CASCADE' })
    rEVIEWs:REVIEW[];
    
}
