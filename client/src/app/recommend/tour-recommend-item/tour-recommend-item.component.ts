import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendar,
  faClock,
  faGreaterThan,
} from '@fortawesome/free-solid-svg-icons';
import { Schedule } from 'src/app/shared/models/Schedule';
import { TourToRecommend } from 'src/app/shared/models/TourToRecommend';

@Component({
  selector: 'app-tour-recommend-item',
  templateUrl: './tour-recommend-item.component.html',
  styleUrls: ['./tour-recommend-item.component.css'],
})
export class TourRecommendItemComponent {
  @Input() tour!: TourToRecommend;
  faCalender = faCalendar as IconProp;
  faClock = faClock as IconProp;
  faGreaterThan = faGreaterThan as IconProp;
  constructor(private router: Router, private datePipe: DatePipe) {}
  goToViewTour(tourId: number, schedules: Schedule[]) {
    var date = '';
    if (schedules.length == 0) {
      date = schedules[0].departureDate;
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        date:
          date == '' ? this.datePipe.transform(Date.now(), 'yyyy-MM-dd') : date,
      },
    };
    this.router.navigate(['/tours', tourId], navigationExtras);
  }
}
