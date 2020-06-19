import { PaymentService } from "../servicies/payment.service";
import { TYPES } from "../../types";
import { container } from "../../inversify.config";
import { ContextRequest, DELETE, GET , Path, PathParam, POST, QueryParam} from "typescript-rest";
import { IPayment, PaymentDto } from "../dto/payment.dto";
import { IsInt } from "typescript-rest-swagger";
import { Request } from "express";
import { UserDto } from "../dto/user.dto";

@Path('payments')
export class PaymentController {

    
    private service: PaymentService;
    
    constructor() {
        this.service = container.get<PaymentService>(TYPES.PaymentService);
    }

    @GET
    public async get(@QueryParam("limit") @IsInt limit?: number, @QueryParam("offset") @IsInt offset?: number,  @QueryParam("filter") filter?: any): Promise<Array<IPayment>> {
        if (offset && filter) {
            const filterObj =  JSON.parse(filter);
            return await this.service.find({take: limit, skip: offset, where: filterObj});
        } else if(filter) {
            const filterObj =  JSON.parse(filter);
            return await this.service.find({where: filterObj});
        } else if(offset) {
            return await this.service.find({take: limit, skip: offset});
        } else {
            return await this.service.find();
        }
    }

    @POST
    public async postPayment(@ContextRequest contextRequest: Request, paymentDto:PaymentDto): Promise<IPayment> {
        const user = contextRequest.user as UserDto;
        paymentDto.CheckinID =  user.UserId;
        const payment = this.service.savePayment(paymentDto);
        return payment;
    }


    @GET
    @Path(':id')
    public async getOne(@PathParam("id") id: number): Promise<IPayment> {
        const paymentDto = await this.service.findOne({PaymentID: id});
        return paymentDto;
    }

    @DELETE
    @Path(":paymentid")
    public async delete(@PathParam("paymentid") payment: number): Promise<boolean>{
        return null;
    }

}