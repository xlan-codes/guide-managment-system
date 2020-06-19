
import { BaseRepository } from "./base-repository";
import { ICustomerRepository } from "./interfaces/customer-repository.interface";
import { getConnection } from "typeorm";
import { injectable } from "inversify";
import { CUSTOMER } from "./entity/CUSTOMER";


@injectable()
export class CustomerRepositoy extends BaseRepository<CUSTOMER> implements ICustomerRepository {

    constructor(){
        super();
        super.repository = getConnection().getRepository(CUSTOMER);
    }

    public async findOne(term: string): Promise<CUSTOMER> {

        const items = await this.repository.find({CUSTOMERUSERNAME:term});
        return items[0];
    }
    
}