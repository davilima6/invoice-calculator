import { Component, Input, OnChanges } from '@angular/core';
import { Invoice } from '../data/invoice';
import { Order } from './order';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnChanges {
  @Input() invoice: Invoice = null;
  @Input() orders: Order[] = [];

  constructor() { }

  ngOnChanges() {
    if (!this.orders || !this.orders.length) {
      return;
    }

    for (const order of this.orders) {
      order.total_price = order.items.reduce(
        (acc, next) => acc += Number(next.total_price.amount),
        0
      )
    }
  }
}
