import {Column,Entity,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {REVIEW} from "./REVIEW";


@Entity("PORTAL",{schema:"dbo" } )
export class PORTAL {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"PORTALID"
        })
    PORTALID:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"PORTALCODE"
        })
    PORTALCODE:string;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"PORTALNAME"
        })
    PORTALNAME:string;
        

   
    @OneToMany(type=>REVIEW, rEVIEW=>rEVIEW.pORTAL,{ onUpdate: 'CASCADE' })
    rEVIEWs:REVIEW[];
    
}
