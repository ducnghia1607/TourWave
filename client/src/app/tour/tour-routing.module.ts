import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourItemComponent } from './tour-item/tour-item.component';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';

const routes: Routes = [
  { path: '', component: TourComponent },
  { path: 'tour-item', component: TourItemComponent },
  { path: ':id', component: TourDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourRoutingModule {}
