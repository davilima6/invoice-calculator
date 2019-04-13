import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from './invoice';

const API = {
  baseUrl: 'http://private-2a91cb-byrd1.apiary-mock.com',
  customers: 'customers',
  orders: 'orders'
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getCustomers() : Observable<any> {
    return this.http.get(`${API.baseUrl}/${API.customers}`);
  }

  getCustomerOrders(invoice: Invoice) : Observable<any> {
    return this.http.get(`${API.baseUrl}/${API.orders}/${API.customers}`, {
      params: {
        customer_id: invoice.customer_id,
        start_date: invoice.start_date,
        end_date: invoice.end_date
      }
    });
  }
}
