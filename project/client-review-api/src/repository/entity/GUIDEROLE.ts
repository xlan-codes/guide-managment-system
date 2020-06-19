import {Column,Entity,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {REVIEWDETAIL} from "./REVIEWDETAIL";


@Entity("GUIDEROLE",{schema:"dbo" } )
export class GUIDEROLE {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"GUIDEROLEID"
        })
    GUIDEROLEID:number;
        

    @Column("varchar",{ 
        nullable:true,
        name:"ROLENMAE"
        })
    ROLENMAE:string | null;
        

   
    @OneToMany(type=>REVIEWDETAIL, rEVIEWDETAIL=>rEVIEWDETAIL.gUIDEROLE,{ onUpdate: 'CASCADE' })
    rEVIEWDETAILs:REVIEWDETAIL[];
    
}
