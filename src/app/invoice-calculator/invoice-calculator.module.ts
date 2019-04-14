import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InvoiceCalculatorComponent } from './invoice-calculator.component';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { InvoiceComponent } from '../invoice/invoice.component';

@NgModule({
  declarations: [
    InvoiceCalculatorComponent,
    InvoiceFormComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    InvoiceCalculatorComponent
  ]
})
export class InvoiceCalculatorModule {};
