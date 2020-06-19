import { Component, OnInit } from '@angular/core';
import { Expense } from 'app/core/models/expense.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

    expenses: Array<Expense>;
    displayedColumns: string[] = ['date', 'tourname', 'operatore', 'guida',  'value', 'reason'];
    constructor() { }

    ngOnInit() {
    }

}
