import { Component, OnInit } from '@angular/core';
import { DataService, CACHE_KEYS } from '../data/data.service';
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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const cacheKey = `${CACHE_KEYS.base}_${CACHE_KEYS.lastInvoice}`;

    this.invoice = this.dataService.getCache(cacheKey);
    if (this.invoice) {
      // Setup also orders
      this.onInvoice(this.invoice);
    }
  }

  onInvoice(event) {
    this.invoice = event;
    this.orders = this.invoice.orders;
  }
}
