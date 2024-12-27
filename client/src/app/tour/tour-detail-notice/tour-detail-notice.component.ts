import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-tour-detail-notice',
  templateUrl: './tour-detail-notice.component.html',
  styleUrls: ['./tour-detail-notice.component.css'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class TourDetailNoticeComponent {}
