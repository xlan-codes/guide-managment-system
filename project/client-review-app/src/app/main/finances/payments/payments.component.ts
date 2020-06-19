import { Component, OnInit } from '@angular/core';
import { Payment } from 'app/core/models/payment.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

    expenses: Array<Payment>;
    displayedColumns: string[] = ['date', 'tourname', 'operatore', 'guida', 'client', 'value', 'payment_type', 'photo'];
  constructor() { }

  ngOnInit() {
  }

}
