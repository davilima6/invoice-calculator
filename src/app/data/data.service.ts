import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

import { Customer } from './customer';
import { Invoice } from './invoice';
import { Order } from '../invoice/order';

const API = {
  baseUrl: 'https://private-2a91cb-byrd1.apiary-mock.com',
  customers: 'customers',
  orders: 'orders'
};

export const CACHE_KEYS = {
  base: 'invoice-calculator',
  customers: 'customers',
  lastInvoice: 'lastInvoice'
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get(`${API.baseUrl}/${API.customers}`) as Observable<Customer[]>;
  }

  getCustomerOrders(invoice: Invoice): Observable<Order[]> {
    return this.http.get(`${API.baseUrl}/${API.orders}/${API.customers}`, {
      params: {
        customer_id: invoice.customer_id,
        start_date: invoice.start_date,
        end_date: invoice.end_date
      }
    }) as Observable<Order[]>;
  }

  getCache(key: string, defaultValue: any = undefined): any | undefined {
    return this.storage.has(key) ? this.storage.get(key) : defaultValue;
  }

  setCache(key: string, value: any): void {
    this.storage.set(key, value);
  }

  clearCache(): boolean {
    this.storage.clear();

    return true;
  }
}
