import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCar,
  faClock,
  faPlane,
  faTrain,
} from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/shared/models/Tour';
import { SharedModule } from 'src/app/shared/shared.module';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-tour-related-item',
  templateUrl: './tour-related-item.component.html',
  styleUrls: ['./tour-related-item.component.css'],
  standalone: true,
  imports: [CurrencyPipe, SharedModule, CommonModule, RouterModule],
})
export class TourRelatedItemComponent {
  constructor(private datePipe: DatePipe) {}
  ngOnInit(tourService: TourService): void {}
  faClock = faClock as IconProp;
  faPlane = faPlane as IconProp;
  faTrain = faTrain as IconProp;
  faCar = faCar as IconProp;
  @Input() tour!: Tour;
  today: Date = new Date();
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
    localStorage.setItem;
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: Adds smooth scrolling animation
    });
  }
}
