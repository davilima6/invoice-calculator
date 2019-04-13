import { Component, OnInit } from '@angular/core';
import { Invoice } from '../data/invoice';
import { Order } from '../invoice/order';

@Component({
  selector: 'app-invoice-calculator',
  templateUrl: './invoice-calculator.component.html',
  styleUrls: ['./invoice-calculator.component.scss']
})
export class InvoiceCalculatorComponent implements OnInit {
  invoice : Invoice;
  orders : Order[];

  constructor() { }

  ngOnInit() { }

  onInvoice(event) {
    this.invoice = event;
    this.orders = this.invoice.orders;
  }
}
