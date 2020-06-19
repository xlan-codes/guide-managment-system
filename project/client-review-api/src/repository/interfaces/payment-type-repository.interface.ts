import { IRepository } from "./repository.interface";
import { PaymentType } from "../entity/payment-type.entity";

export interface IPaymentTypeRepository extends IRepository<PaymentType> {

}