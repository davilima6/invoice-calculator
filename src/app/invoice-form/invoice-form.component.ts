import { Component, OnInit } from '@angular/core';
import { Invoice } from '../data/invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoice: Invoice = {
    customer: null,
    start: null,
    end: null
  }

  constructor() { }

  ngOnInit() {
  }
}
