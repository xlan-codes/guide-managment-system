
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IPayment } from "../dto/payment.dto";
import { Payment } from "../repository/entity/payment.entity";
import { IPaymentRepository } from "../repository/interfaces/payment-repository.interface";

@injectable()
export class PaymentService {
    @inject(TYPES.PaymentRepository)
    private repository: IPaymentRepository;

    public async find(expr?: any): Promise<Array<IPayment>> {

        const arr = await this.repository.find(expr);
        const PaymentList = arr.map((e) => {
            return this.toPaymentDto(e);
        } );
        return PaymentList;
    }

    public async findOne(term: any): Promise<IPayment> {
        const payment = await this.repository.findOne(term);
        return (payment === undefined) ? undefined : this.toPaymentDto(payment);
    }

    public async savePayment(payment: IPayment): Promise<IPayment> {
        const c = await this.repository.create(await this.toPaymentEntity(payment));
        payment.PaymentID = c.PaymentID;
        return payment;
    }  
    
    public toPaymentDto(payment : Payment):IPayment {
        return {
            
        } as IPayment;
    }

    public async toPaymentEntity(paymentDto: IPayment): Promise<Payment> {
        return {

        } as Payment;
    }

}