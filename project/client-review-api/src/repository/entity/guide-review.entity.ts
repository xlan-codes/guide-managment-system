import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import { TourApp } from "./tour-app.entity";


@Entity("tblGuideReview",{schema:"dbo" } )
export class GuideReview {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"GudieReviewID"
        })
    public GudieReviewID:number;
        

   
    @ManyToOne(()=>TourApp, tourApp=>tourApp.GuideReviews,{  nullable:false, })
    @JoinColumn({ name:'TourID'})
    public tour:TourApp | null;


    @Column("date",{ 
        nullable:false,
        name:"MeetingPointHour"
        })
    public MeetingPointHour:Date;
        

    @Column("date",{ 
        nullable:false,
        name:"DepartureTime"
        })
    public DepartureTime:Date;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"BusStatus"
        })
    public BusStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"DriverClothingStatus"
        })
    public DriverClothingStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"WifiStatus"
        })
    public WifiStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"MicrofonStatus"
        })
    public MicrofonStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"LunchTimeStatus"
        })
    public LunchTimeStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"WineTastingStatus"
        })
    public WineTastingStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"GuideWineryStatus"
        })
    public GuideWineryStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"AssistantGuideStatus"
        })
    public AssistantGuideStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"GuidaStatus"
        })
    public GuidaStatus:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"RestorantStatus"
        })
    public RestorantStatus:string;
        

    @Column("text",{ 
        nullable:false,
        name:"Problems"
        })
    public Problems:string;
        

    @Column("date",{ 
        nullable:false,
        name:"ReturnHour"
        })
    public ReturnHour:Date;
        

    @Column("text",{ 
        nullable:true,
        name:"SoldTours"
        })
    public SoldTours:string | null;
        
}
