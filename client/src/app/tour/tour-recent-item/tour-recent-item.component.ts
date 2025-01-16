import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/shared/models/Tour';

@Component({
  selector: 'app-tour-recent-item',
  templateUrl: './tour-recent-item.component.html',
  styleUrls: ['./tour-recent-item.component.css'],
})
export class TourRecentItemComponent {
  faClose = faClose as IconProp;
  @Input() tour!: Tour;
  @Output() removeRecentTour = new EventEmitter<number>();
  constructor(private router: Router) {}
  removeItemFromRecentVisitedTours(id: number) {
    this.removeRecentTour.emit(id);
  }
}
