import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { checkoutResolver } from './resolvers/checkout.resolver';
import { CheckoutResultComponent } from './checkout-result/checkout-result.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    resolve: { tour: checkoutResolver },
  },
  {
    path: 'result',
    component: CheckoutResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
