import {Column,Entity,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import { UserRole } from "./user-roles.entity";


@Entity("tblRole",{schema:"dbo" } )
export class Role {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"RoleId"
        })
    public RoleId:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"RoleName"
        })
    public RoleName:string;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"RoleDescription"
        })
    public RoleDescription:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:5,
        name:"RoleTag"
        })
    public RoleTag:string | null;
        

   
    @OneToMany(()=>UserRole, userRole=>userRole.role)
    public userRoles:Array<UserRole>;
    
}
