import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceCalculatorComponent } from './invoice-calculator/invoice-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFormComponent,
    InvoiceComponent,
    InvoiceCalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
