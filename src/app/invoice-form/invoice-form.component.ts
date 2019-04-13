import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invoice } from '../data/invoice';
import { DataService } from '../data/data.service';
import { Customer } from '../data/customer';
import { Order } from '../invoice/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  @Output() invoicer : EventEmitter<Invoice> = new EventEmitter();

  originalInvoice: Invoice = {
    customer_id: null,
    start_date: null,
    end_date: null,
    amount: null,
    orders: null,
    ordersNumber: null
  }

  invoice: Invoice = {...this.originalInvoice};

  customers: Observable<Customer[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCustomers().subscribe(
      result => (this.customers = result),
      error => console.log('error: ', error)
    );
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.dataService.getCustomerOrders(this.invoice).subscribe(
      data => {
        this.invoice.orders = data;
        this.invoice.ordersNumber = data.length;
        this.invoice.amount = data.reduce((acc, next) => acc += Number(next.charge_customer.total_price), 0);
        this.invoicer.emit(this.invoice);
      },
      error => console.log('error: ', error)
    );
  }
}
