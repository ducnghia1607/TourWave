import { NgModule } from '@angular/core';

import { RecommendRoutingModule } from './recommend-routing.module';
import { RecommendComponent } from './recommend.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RecommendComponent],
  imports: [CommonModule, RecommendRoutingModule, SharedModule],
})
export class RecommendModule {}
