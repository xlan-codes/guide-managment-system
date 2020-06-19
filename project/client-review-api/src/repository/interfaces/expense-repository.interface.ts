import { Expense } from "../entity/expense.entity";
import { IRepository } from "./repository.interface";

export interface IExpenseRepository  extends IRepository<Expense> {

}