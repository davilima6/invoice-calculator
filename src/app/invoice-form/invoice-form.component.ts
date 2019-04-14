import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invoice } from '../data/invoice';
import { DataService, CACHE_KEYS } from '../data/data.service';
import { Customer } from '../data/customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  @Output() invoicer: EventEmitter<Invoice> = new EventEmitter();
  private cacheKeys: any = {
    customers: `${CACHE_KEYS.base}_${CACHE_KEYS.customers}`,
    invoice: `${CACHE_KEYS.base}_${CACHE_KEYS.lastInvoice}`
  }

  originalInvoice: Invoice = {
    customer_id: null,
    start_date: null,
    end_date: null,
    amount: null,
    orders: null,
    ordersNumber: null
  }

  @Input() invoice: Invoice = this.invoice || { ...this.originalInvoice };

  customers: Observable<Customer[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.customers = this.dataService.getCache(this.cacheKeys.customers);

    if (this.customers) {
      return;
    }

    this.dataService.getCustomers().subscribe(
      result => {
        this.customers = result;
        this.dataService.setCache(this.cacheKeys.customers, this.customers);
      },
      error => console.log('error: ', error)
    );
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.dataService.setCache(this.cacheKeys.invoice, this.invoice);

    this.dataService.getCustomerOrders(this.invoice).subscribe(
      data => {
        this.invoice.orders = data;
        this.invoice.ordersNumber = data.length;
        this.invoice.amount = data.reduce((acc, next) => acc += Number(next.charge_customer.total_price), 0);
        this.dataService.setCache(this.cacheKeys.invoice, this.invoice);
        this.invoicer.emit(this.invoice);
      },
      error => console.log('error: ', error)
    );
  }
}
