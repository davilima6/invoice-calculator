import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService, CACHE_KEYS } from '../data/data.service';
import { Invoice } from '../data/invoice';
import { Customer } from '../data/customer';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  @Input() invoice: Invoice;
  @Output() invoicer: EventEmitter<Invoice> = new EventEmitter();
  @Output() clearer: EventEmitter<Invoice> = new EventEmitter();
  private cacheKeys: any = {
    customers: `${CACHE_KEYS.base}_${CACHE_KEYS.customers}`,
    invoice: `${CACHE_KEYS.base}_${CACHE_KEYS.lastInvoice}`
  }

  customers: Customer[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.invoice = this.dataService.getCache(this.cacheKeys.invoice, {});
    this.customers = this.dataService.getCache(this.cacheKeys.customers, []);

    if (this.customers.length) {
      return;
    }

    this.dataService.getCustomers().subscribe(
      result => {
        this.customers = result;
        this.dataService.setCache(this.cacheKeys.customers, result);
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
        this.invoice.daysNumber = Math.floor((Date.parse(this.invoice.end_date) - Date.parse(this.invoice.start_date)) / 86400000) + 1;
        this.invoice.customer_name = this.customers.find(el => el.id === this.invoice.customer_id).name;
        this.invoice.amount = data.reduce((acc, next) => acc += Number(next.charge_customer.total_price), 0);
        this.dataService.setCache(this.cacheKeys.invoice, this.invoice);
        this.invoicer.emit(this.invoice);
      },
      error => console.log('error: ', error)
    );
  }

  onClear() {
    this.clearer.emit();
  }
}
