import { BaseRepository } from "./base-repository";
import { PaymentType } from "./entity/payment-type.entity";
import { IPaymentTypeRepository } from "./interfaces/payment-type-repository.interface";
import { injectable } from "inversify";
import { getConnection } from "typeorm";

@injectable()
export class PaymentTypeRepository extends BaseRepository<PaymentType> implements IPaymentTypeRepository {
    constructor(){
        super();
        super.repository = getConnection().getRepository(PaymentType);
    }
}
