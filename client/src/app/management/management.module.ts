import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ManagementSidebarComponent } from './management-sidebar/management-sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { TourManagementComponent } from './tour-management/tour-management.component';
import { ConsultingManagementComponent } from './consulting-management/consulting-management.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { ConsultingDialogViewComponent } from './consulting-dialog-view/consulting-dialog-view.component';
import { BookingDialogViewComponent } from './booking-dialog-view/booking-dialog-view.component';
import { CreateNewTourComponent } from './create-new-tour/create-new-tour.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditTourComponent } from './edit-tour/edit-tour.component';
import { EditScheduleTourComponent } from './edit-schedule-tour/edit-schedule-tour.component';

@NgModule({
  declarations: [ManagementComponent, ManagementSidebarComponent, TourManagementComponent, ConsultingManagementComponent, BookingManagementComponent, ConsultingDialogViewComponent, BookingDialogViewComponent, CreateNewTourComponent, ConfirmDialogComponent, EditTourComponent, EditScheduleTourComponent],
  imports: [CommonModule, ManagementRoutingModule, SharedModule],
})
export class ManagementModule {}
