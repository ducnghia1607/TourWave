import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/shared/models/Tour';

@Component({
  selector: 'app-tour-recommend-recent',
  templateUrl: './tour-recommend-recent.component.html',
  styleUrls: ['./tour-recommend-recent.component.css'],
})
export class TourRecommendRecentComponent {
  faClose = faClose as IconProp;
  @Input() tour!: Tour;
  @Output() removeRecentTour = new EventEmitter<number>();
  constructor(private router: Router) {}
  removeItemFromRecentVisitedTours(id: number) {
    this.removeRecentTour.emit(id);
  }
  navigateToTourDetail(title: string, tourCode: string) {
    this.router.navigate(['/tours', title, tourCode]);
  }
}
