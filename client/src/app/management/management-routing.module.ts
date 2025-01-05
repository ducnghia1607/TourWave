import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { ConsultingManagementComponent } from './consulting-management/consulting-management.component';
import { TourManagementComponent } from './tour-management/tour-management.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { CreateNewTourComponent } from './create-new-tour/create-new-tour.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      { path: '', redirectTo: 'tours', pathMatch: 'full' },
      { path: 'consulting', component: ConsultingManagementComponent },
      {
        path: 'tours',
        component: TourManagementComponent,
      },
      { path: 'booking', component: BookingManagementComponent },
      {
        path: 'create-new-tour',
        component: CreateNewTourComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
