import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCar,
  faClock,
  faPlane,
  faTrain,
} from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/shared/models/Tour';

@Component({
  selector: 'app-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.css'],
})
export class TourItemComponent implements OnInit {
  constructor(private datePipe: DatePipe) {}
  ngOnInit(): void {}
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
    if (idx != -1) return;
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
