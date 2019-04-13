import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCalculatorComponent } from './invoice-calculator.component';

describe('InvoiceCalculatorComponent', () => {
  let component: InvoiceCalculatorComponent;
  let fixture: ComponentFixture<InvoiceCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
