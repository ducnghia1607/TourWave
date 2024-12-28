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

@NgModule({
  declarations: [HighlightPipe],
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
  ],
})
export class SharedModule {
  static forRoot: any;
}
