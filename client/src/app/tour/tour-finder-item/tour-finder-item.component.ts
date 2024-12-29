import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {}
  goToViewTour(tourTitle: string, tourCode: string) {
    console.log(tourTitle, tourCode);
    this.router.navigate(['/tours', tourTitle, tourCode]);
  }
}
