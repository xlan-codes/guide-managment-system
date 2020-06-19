import {Column,Entity,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {REVIEW} from "./REVIEW";


@Entity("TOUR",{schema:"dbo" } )
export class TOUR {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"TOURID"
        })
    public TOURID:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"TOURCODE"
        })
    public TOURCODE:string;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"TOURNAME"
        })
    public TOURNAME:string;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"EXT_ID"
        })
    public EXT_ID:string;
        

   
    @OneToMany(type=>REVIEW, review=>review.tOUR,{ onUpdate: 'CASCADE' })
    public reviews:Array<REVIEW>;

    // @OneToMany(type=>Seo, seo=>seo.idTour)
    // public Seos:Array<Seo>;
    
}
