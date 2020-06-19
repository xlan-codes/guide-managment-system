import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IExpenseRepository } from "../repository/interfaces/expense-repository.interface";
import { ExpenseDto, IExpense } from "../dto/expense.dto";
import { Utils } from "../utils/utils";
import { Expense } from "../repository/entity/expense.entity";
import { IGuideRepository } from "../repository/interfaces/guide-repository.interface";
import { ITourAppRepository } from "../repository/interfaces/tour-app-repostitory.interface";

@injectable()
export class ExpenseService {

    @inject(TYPES.ExpenseRepository)
    private repository: IExpenseRepository;

    @inject(TYPES.GuideRepositoy)
    private guideRepo: IGuideRepository;

    @inject(TYPES.TourAppRepository)
    private tourRepo: ITourAppRepository;



    public async getAll(expr?: any): Promise<Array<IExpense>> {

        const arr = await this.repository.find(expr);
        const expenseList = Utils.toArrayOfType<IExpense, Expense>(arr, this.toExpenseDto);
        return expenseList;
    }

    public async find(filter: any): Promise<Array<IExpense>> {

        const arr = await this.repository.find(filter);
        const expenseList = arr.map((e) => {
            return this.toExpenseDto(e);
        } );
        return expenseList;
    }

    public async getOne(term: string): Promise<IExpense> {
        const expense = await this.repository.findOne(term);
        return (expense === undefined) ? undefined : this.toExpenseDto(expense);
    }

    public async saveExpense(expense: IExpense): Promise<IExpense> {
        const c = await this.repository.create(await this.toExpenseEntity(expense));
        expense.ExpenseID = c.ExpenseID;
        return expense;
    }  
    
    public toExpenseDto(expense : Expense):IExpense {
        return {
            ExpenseID: expense.ExpenseID,
            Reason: expense.Reason,
            Value: expense.Value,
            GuideID: expense.guide ? expense.guide.GUIDEID : null,
            TourID: expense.tour ? expense.tour.TourID : null,
        } as IExpense;
    }

    public async toExpenseEntity(expenseDto: ExpenseDto): Promise<Expense> {
        const guide = await this.guideRepo.find({GUIDEID: expenseDto.GuideID});
        const tourApp = await this.tourRepo.find({TourID: expenseDto.TourID});
        return {
            ExpenseID: expenseDto.ExpenseID,
            Reason: expenseDto.Reason,
            Value: expenseDto.Value,
            guide: guide[0] ? guide[0] : null,
            tour: tourApp[0] ? tourApp[0] : null
        } as Expense;
    }

}