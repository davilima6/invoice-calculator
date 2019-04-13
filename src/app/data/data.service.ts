import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from './invoice';

const API = {
  baseUrl: 'http://polls.apiblueprint.org',
  orders: 'orders'
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCustomerOrders(invoice: Invoice) : Observable<any> {
    return this.http.get(`${API.baseUrl}/${API.orders}/`, {
      params: {
        customer_id: invoice.customer_id,
        start_date: invoice.start_date,
        end_date: invoice.end_date,
      }
    })
  }
}
