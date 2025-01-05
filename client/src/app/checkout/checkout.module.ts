import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../shared/shared.module';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary.component';
import { CheckoutResultComponent } from './checkout-result/checkout-result.component';

@NgModule({
  declarations: [CheckoutComponent, CheckoutSummaryComponent, CheckoutResultComponent],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule],
})
export class CheckoutModule {}
