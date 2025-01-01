import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendar,
  faClock,
  faGreaterThan,
} from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/shared/models/Tour';
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
  goToViewTour(tourTitle: string, tourCode: string, date: string) {
    console.log(tourTitle, tourCode, date);

    const navigationExtras: NavigationExtras = {
      queryParams: {
        date: date || this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
      },
    };
    this.router.navigate(['/tours', tourTitle, tourCode], navigationExtras);
  }
}
