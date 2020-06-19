import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-roles.entity";


@Entity("tblSystemUser",{schema:"dbo" } )
export class SystemUserEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"UserId"
        })
    public UserId:number;
        

    @Column("varchar",{ 
        nullable:false,
        name:"UserName"
        })
    public UserName:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"Name"
        })
    public Name:string;
        

    @Column("varchar",{ 
        nullable:true,
        name:"Email"
        })
    public Email:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"Password"
        })
    public Password:string | null;

       
    @OneToMany(type=>UserRole, userRole=>userRole.user)
    public userRoles:Array<UserRole>;
    
}