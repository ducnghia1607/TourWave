import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MyTripComponent } from './tour/my-trip/my-trip.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tours',
    pathMatch: 'full',
  },
  {
    path: 'tours',
    loadChildren: () => import('./tour/tour.module').then((m) => m.TourModule),
  },
  {
    path: 'recommend',
    loadChildren: () =>
      import('./recommend/recommend.module').then((m) => m.RecommendModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'management',
    loadChildren: () =>
      import('./management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'trips',
    component: MyTripComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
