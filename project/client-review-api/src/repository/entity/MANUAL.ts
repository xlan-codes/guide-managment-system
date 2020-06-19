import {Column,Entity,PrimaryGeneratedColumn} from "typeorm";


@Entity("MANUAL",{schema:"dbo" } )
export class MANUAL {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"ID"
        })
    ID:number;
        

   
    @Column({ type:'int', name:'TOURID'})
    TOURID: number ;


    @Column("varchar",{ 
        nullable:false,
        name:"MANUALNAME"
        })
    MANUALNAME:string;
        

    @Column("text",{ 
        nullable:false,
        name:"TOURDESCRIPTION"
        })
    TOURDESCRIPTION:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"TOURDOC"
        })
    TOURDOC:string;
        
}
