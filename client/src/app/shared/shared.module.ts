import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HighlightPipe } from './pipes/highlight.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationComponent } from './components/notification/notification.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SafePipe } from './pipes/safe.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [
    HighlightPipe,
    PaginationComponent,
    NotificationComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    NgxPaginationModule,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MatDialogModule,
    MatMenuModule,
    MatStepperModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    FileUploadModule,
  ],
  exports: [
    FontAwesomeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    HighlightPipe,
    NgxPaginationModule,
    PaginationComponent,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MatDialogModule,
    MatMenuModule,
    MatStepperModule,
    SafePipe,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    FileUploadModule,
  ],
})
export class SharedModule {
  static forRoot: any;
}
