import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  postInvoiceForm(invoice: Invoice) : Observable<Invoice> {
    return of(invoice);
  }
}
