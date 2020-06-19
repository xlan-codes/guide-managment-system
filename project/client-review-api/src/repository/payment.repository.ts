import { BaseRepository } from "./base-repository";
import { Payment } from "./entity/payment.entity";
import { IPaymentRepository } from "./interfaces/payment-repository.interface";
import { injectable } from "inversify";
import { getConnection } from "typeorm";

@injectable()
export class PaymentRepository extends BaseRepository<Payment> implements IPaymentRepository {
    constructor(){
        super();
        super.repository = getConnection().getRepository(Payment);
    }
}