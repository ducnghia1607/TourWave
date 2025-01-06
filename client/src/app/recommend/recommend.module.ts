import { NgModule } from '@angular/core';

import { RecommendRoutingModule } from './recommend-routing.module';
import { RecommendComponent } from './recommend.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TourRecommendItemComponent } from './tour-recommend-item/tour-recommend-item.component';
import { TourRecommendContentComponent } from './tour-recommend-content/tour-recommend-content.component';
import { TourRecommendRecentComponent } from './tour-recommend-recent/tour-recommend-recent.component';

@NgModule({
  declarations: [
    RecommendComponent,
    TourRecommendItemComponent,
    TourRecommendContentComponent,
    TourRecommendRecentComponent,
  ],
  imports: [CommonModule, RecommendRoutingModule, SharedModule],
})
export class RecommendModule {}
