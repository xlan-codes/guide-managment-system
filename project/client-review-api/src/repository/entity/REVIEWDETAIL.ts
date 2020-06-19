import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {REVIEW} from "./REVIEW";
// import {GUIDE} from "./GUIDE";
import {GUIDEROLE} from "./GUIDEROLE";


@Entity("REVIEWDETAIL",{schema:"dbo" } )
export class REVIEWDETAIL {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"REVIEWDETAILID"
        })
    public REVIEWDETAILID:number;
        

   
    @ManyToOne(type=>REVIEW, rEVIEW=>rEVIEW.rEVIEWDETAILs,{  nullable:false,onUpdate: 'CASCADE' })
    @JoinColumn({ name:'REVIEWID'})
    public rEVIEW:REVIEW | null;


   
    // @ManyToOne(type=>GUIDE, gUIDE=>gUIDE.rEVIEWDETAILs,{  nullable:false,onUpdate: 'CASCADE' })
    // @JoinColumn({ name:'GUIDEID'})
    // gUIDE:GUIDE | null;


    @Column("int",{ 
        nullable:false,
        name:"EVALUATION"
        })
    public EVALUATION:number;

    @Column("int",{ 
        nullable:false,
        name:"GUIDEID"
        })
    public GUIDEID:number;

    @Column("int",{ 
        nullable:false,
        name:"GUIDEROLEID"
        })
    public GUIDEROLEID:number;

    @Column("int",{ 
        nullable:false,
        name:"REVIEWID"
        })
    public REVIEWID:number;
        

    @Column("text",{ 
        nullable:false,
        name:"TEXTEVALUATION"
        })
    public TEXTEVALUATION:string;
        

   
    @ManyToOne(type=>GUIDEROLE, gUIDEROLE=>gUIDEROLE.rEVIEWDETAILs,{  nullable:false,onUpdate: 'CASCADE' })
    @JoinColumn({ name:'GUIDEROLEID'})
    public gUIDEROLE:GUIDEROLE | null;

}
