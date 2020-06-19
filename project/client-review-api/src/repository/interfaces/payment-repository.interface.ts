import { IRepository } from "./repository.interface";
import { Payment } from "../entity/payment.entity";


export  interface IPaymentRepository extends IRepository<Payment> {
}