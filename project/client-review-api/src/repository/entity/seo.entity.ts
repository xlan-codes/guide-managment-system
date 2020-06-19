import {Column,Entity, PrimaryColumn} from "typeorm";


@Entity("tblSeo",{schema:"dbo" } )
export class Seo {

    @Column("varchar",{ 
        nullable:true,
        length:150,
        name:"SeoTitle"
        })
    public SeoTitle:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:250,
        name:"SeoDecription"
        })
    public SeoDecription:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"SeoUrlPage"
        })
    public SeoUrlPage:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"SeoSchema"
        })
    public SeoSchema:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"SeoImage"
        })
    public SeoImage:string | null;
        

   
    
    @PrimaryColumn("int",{ 
        nullable:false,
        name:"IdTour"
        })
    public IdTour: number | null;

}
