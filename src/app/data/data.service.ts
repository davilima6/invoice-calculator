import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Invoice } from './invoice';

const API = {
  baseUrl: 'http://private-2a91cb-byrd1.apiary-mock.com',
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

  getCustomers(): Observable<any> {
    return this.http.get(`${API.baseUrl}/${API.customers}`);
  }

  getCustomerOrders(invoice: Invoice): Observable<any> {
    return this.http.get(`${API.baseUrl}/${API.orders}/${API.customers}`, {
      params: {
        customer_id: invoice.customer_id,
        start_date: invoice.start_date,
        end_date: invoice.end_date
      }
    });
  }

  getCache(key) {
    return this.storage.get(key);
  }

  setCache(key, value) {
    this.storage.set(key, value);
  }

  clearCache() {
    this.storage.clear();
    return true;
  }
}
