import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourItemComponent } from './tour-item/tour-item.component';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { tourDetailResolver } from './resolvers/tour-detail.resolver';
import { TourFinderComponent } from './tour-finder/tour-finder.component';

const routes: Routes = [
  { path: '', component: TourComponent, data: { breadcrumb: 'Home' } },
  { path: 'tour-item', component: TourItemComponent },
  {
    path: ':title/:tourCode',
    component: TourDetailComponent,
    resolve: { tourDetail: tourDetailResolver },
    data: {
      breadcrumb: {
        alias: 'tourTitle',
      },
    },
  },
  {
    path: ':departure',
    component: TourFinderComponent,
    data: {
      breadcrumb: {
        alias: 'locationName',
      },
    },
    // resolve: { tourDetail: tourDetailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourRoutingModule {}
