import {Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import { SystemUserEntity } from "./system-user.entity";
import { Role } from "./role.entity";


@Entity("tblUserRoles",{schema:"dbo" } )
export class UserRole {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"UserRoleID"
        })
    public UserRoleID:number;
        

   
    @ManyToOne(()=>SystemUserEntity, systemUser=>systemUser.userRoles,{  nullable:false, })
    @JoinColumn({ name:'UserId'})
    public user:SystemUserEntity | null;


   
    @ManyToOne(()=>Role, role=>role.userRoles,{  nullable:false, })
    @JoinColumn({ name:'RoleId'})
    public role: Role | null;

}
