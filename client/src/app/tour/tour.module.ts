import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourRoutingModule } from './tour-routing.module';
import { TourComponent } from './tour.component';
import { TourItemComponent } from './components/tour-item/tour-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TourComponent, TourItemComponent],
  imports: [CommonModule, TourRoutingModule, SharedModule],
})
export class TourModule {}
