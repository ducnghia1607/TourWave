import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { TourRoutingModule } from './tour-routing.module';
import { TourComponent } from './tour.component';
import { TourItemComponent } from './tour-item/tour-item.component';
import { SharedModule } from '../shared/shared.module';
import { TourHomeSearchComponent } from './tour-home-search/tour-home-search.component';
import { TourFinderComponent } from './tour-finder/tour-finder.component';
import { TourFinderSearchComponent } from './tour-finder-search/tour-finder-search.component';
import { TourFinderSidebarComponent } from './tour-finder-sidebar/tour-finder-sidebar.component';
import { TourFinderContentComponent } from './tour-finder-content/tour-finder-content.component';
import { TourFinderItemComponent } from './tour-finder-item/tour-finder-item.component';
import { TourRecentItemComponent } from './tour-recent-item/tour-recent-item.component';
import { MyTripComponent } from './my-trip/my-trip.component';

@NgModule({
  declarations: [
    TourComponent,
    TourItemComponent,
    TourHomeSearchComponent,
    TourFinderComponent,
    TourFinderSearchComponent,
    TourFinderSidebarComponent,
    TourFinderContentComponent,
    TourFinderItemComponent,
    TourRecentItemComponent,
    MyTripComponent,
  ],
  imports: [CommonModule, TourRoutingModule, SharedModule],
  exports: [TourItemComponent],
})
export class TourModule {}
