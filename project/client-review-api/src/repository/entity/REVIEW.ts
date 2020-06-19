import {Column,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {TOUR} from "./TOUR";
import {PORTAL} from "./PORTAL";
import {CUSTOMER} from "./CUSTOMER";
import {REVIEWDETAIL} from "./REVIEWDETAIL";


@Entity("REVIEW",{schema:"dbo" } )
export class REVIEW {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"REVIEWID"
        })
    public REVIEWID:number;
        

    // @Column("varchar",{ 
    //     nullable:false,
    //     name:"REVIEWCODE"
    //     })
    // REVIEWCODE:string;

    @Column("int",{ 
        nullable:false,
        name:"TOURID"
        })
    public TOURID:number;

    @Column("int",{ 
        nullable:false,
        name:"PORTALID"
        })
    public PORTALID:number;

    @Column("int",{ 
        nullable:false,
        name:"CUSTOMERID"
        })
    public CUSTOMERID:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"CREATEDDATE"
        })
    public CREATEDDATE:Date;

    @Column("nvarchar",{ 
        nullable:true,
        name:"ReviewUrl"
        })
    public ReviewUrl:string | null;

    @Column("nvarchar",{ 
        nullable:true,
        name:"REVIEWTITLE"
        })
    public REVIEWTITLE:string | null;
        

   
    @ManyToOne(type=>TOUR, tOUR=>tOUR.reviews,{  nullable:false,onUpdate: 'CASCADE' })
    @JoinColumn({ name:'TOURID'})
    public tOUR:TOUR | null;


   
    @ManyToOne(type=>PORTAL, pORTAL=>pORTAL.rEVIEWs,{  nullable:false,onUpdate: 'CASCADE' })
    @JoinColumn({ name:'PORTALID'})
    public pORTAL:PORTAL | null;


   
    @ManyToOne(type=>CUSTOMER, cUSTOMER=>cUSTOMER.rEVIEWs,{  nullable:false,onUpdate: 'CASCADE' })
    @JoinColumn({ name:'CUSTOMERID'})
    public cUSTOMER:CUSTOMER | null;


   
    @OneToMany(type=>REVIEWDETAIL, rEVIEWDETAIL=>rEVIEWDETAIL.rEVIEW,{ onUpdate: 'CASCADE' })
    public rEVIEWDETAILs:Array<REVIEWDETAIL>;
    
}
