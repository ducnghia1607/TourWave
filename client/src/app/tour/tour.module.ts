import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { TourRoutingModule } from './tour-routing.module';
import { TourComponent } from './tour.component';
import { TourItemComponent } from './tour-item/tour-item.component';
import { SharedModule } from '../shared/shared.module';
import { TourHomeSearchComponent } from './tour-home-search/tour-home-search.component';
import { TourFinderComponent } from './tour-finder/tour-finder.component';

@NgModule({
  declarations: [TourComponent, TourItemComponent, TourHomeSearchComponent, TourFinderComponent],
  imports: [CommonModule, TourRoutingModule, SharedModule],
})
export class TourModule {}
