import { ExpenseService } from "../servicies/expene.service";
import { TYPES } from "../../types";
import { container } from "../../inversify.config";
import { ContextRequest, DELETE, GET , Path, PathParam, POST, QueryParam} from "typescript-rest";
import { ExpenseDto } from "../dto/expense.dto";
import { IsInt } from "typescript-rest-swagger";
import { Request } from "express";
import { UserDto } from "../dto/user.dto";


@Path('expenses')
export class ExpenseController {

    
    private service: ExpenseService;
    
    constructor() {
        this.service = container.get<ExpenseService>(TYPES.ExpenseService);
    }

    @GET
    public async getExpenses(@QueryParam("limit") @IsInt limit?: number, @QueryParam("offset") @IsInt offset?: number,  @QueryParam("filter") filter?: string): Promise<Array<ExpenseDto>> {
        if (offset && filter) {
            const filterObj =  JSON.parse(filter);
            return await this.service.getAll({take: limit, skip: offset, where: filterObj});
        } else if(filter) {
            const filterObj =  JSON.parse(filter);
            return await this.service.getAll({take: limit, skip: offset, where: filterObj});
        } else if(offset) {
            return await this.service.getAll({take: limit, skip: offset});
        } else {
            return await this.service.getAll();
        }
    }

    @POST
    public async postExpense(@ContextRequest contextRequest: Request, expenseDto: ExpenseDto): Promise<ExpenseDto> {
        const user = contextRequest.user as UserDto;
        expenseDto.CheckinID =  user.UserId;
        return await this.service.saveExpense(expenseDto);
    }


    @GET
    @Path(':expenseid')
    public async getExpense(@PathParam("expenseid") expenseId: number): Promise<Array<ExpenseDto>> {
        return null;
    }

    @DELETE
    @Path(":expenseid")
    public async deleteExpense(@PathParam("expenseid") expenseId: number): Promise<boolean>{
        return null;
    }

}