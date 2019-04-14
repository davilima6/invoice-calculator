import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { DataService, CACHE_KEYS } from '../data/data.service';
import { Invoice } from '../data/invoice';
import { Order } from '../invoice/order';

@Component({
  selector: 'app-invoice-calculator',
  templateUrl: './invoice-calculator.component.html',
  styleUrls: ['./invoice-calculator.component.scss'],
  animations: [
    trigger('invoiceAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }),
        animate('500ms ease-out'), style({
          opacity: 1,
          transform: 'translateY(0)'
        })
      ])
    ])
  ]
})
export class InvoiceCalculatorComponent implements OnInit {
  originalInvoice: Invoice = {
    customer_id: null,
    customer_name: null,
    start_date: null,
    end_date: null,
    daysNumber: null,
    amount: null,
    orders: null,
    ordersNumber: null
  }

  isFormEnabled: boolean = true;
  invoice: Invoice = this.invoice || { ...this.originalInvoice };
  orders: Order[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const cacheKey = `${CACHE_KEYS.base}_${CACHE_KEYS.lastInvoice}`;

    this.invoice = this.dataService.getCache(cacheKey);

    // Setup also orders
    if (this.invoice) {
      this.onInvoice(this.invoice);
    }
  }

  onClear() {
    this.isFormEnabled = true;
    this.orders = null;
    this.dataService.clearCache();
  }

  onInvoice(event: Invoice) {
    this.isFormEnabled = false;
    this.invoice = event;
    this.orders = event ? this.invoice.orders : null;
  }
}
