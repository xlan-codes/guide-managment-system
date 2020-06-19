import { BaseRepository } from "./base-repository";
import { Expense } from "./entity/expense.entity";
import { IExpenseRepository } from "./interfaces/expense-repository.interface";
import { injectable } from "inversify";
import { getConnection } from "typeorm";

@injectable()
export class ExpenseRepository extends BaseRepository<Expense> implements IExpenseRepository {
    constructor(){
        super();
        super.repository = getConnection().getRepository(Expense);
    }
}
