import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/shared/models/Tour';

@Component({
  selector: 'app-tour-finder-item',
  templateUrl: './tour-finder-item.component.html',
  styleUrls: ['./tour-finder-item.component.css'],
})
export class TourFinderItemComponent {
  @Input() tour!: Tour;
  faCalender = faCalendar as IconProp;
  faClock = faClock as IconProp;
  faGreaterThan = faGreaterThan as IconProp;
  constructor(private router: Router, private datePipe: DatePipe) {}
  goToViewTour(tourTitle: string, tourCode: string, date: string) {
    // console.log(tourTitle, tourCode, date);
    this.setRecentVistedTour();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        date: date || this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
      },
    };
    this.router.navigate(['/tours', tourTitle, tourCode], navigationExtras);
  }

  setRecentVistedTour() {
    var recentVisitedTours = JSON.parse(
      localStorage.getItem('recentVisitedTours') || '[]'
    );
    var idx = recentVisitedTours.findIndex((x: any) => x.id == this.tour.id);
    if (idx == -1) return;
    if (recentVisitedTours.length >= 6) {
      recentVisitedTours.shift();
    }
    recentVisitedTours.push(this.tour);
    localStorage.setItem(
      'recentVisitedTours',
      JSON.stringify(recentVisitedTours)
    );
  }
}
