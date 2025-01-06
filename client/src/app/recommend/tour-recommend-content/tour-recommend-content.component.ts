import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/shared/models/Pagination';
import { Tour } from 'src/app/shared/models/Tour';
import { TourToRecommend } from 'src/app/shared/models/TourToRecommend';

@Component({
  selector: 'app-tour-recommend-content',
  templateUrl: './tour-recommend-content.component.html',
  styleUrls: ['./tour-recommend-content.component.css'],
})
export class TourRecommendContentComponent {
  ngOnInit(): void {
    if (this.tourPagination) {
      this.pageNumber = this.tourPagination.pageIndex;
    }
    this.recentVisitedTours = JSON.parse(
      localStorage.getItem('recentVisitedTours') || '[]'
    );
  }
  @Input() tourPagination!: Pagination<TourToRecommend[]>;
  @Output() ChangePageNumber = new EventEmitter<number>();
  pageNumber: number = 1;
  pageNumberChanged($event: any) {
    this.pageNumber = $event;
    this.ChangePageNumber.emit(this.pageNumber);
  }
  recentVisitedTours: Tour[] = [];

  removeRecentTourHandle($event: any) {
    this.recentVisitedTours = this.recentVisitedTours.filter(
      (x: any) => x.id != $event
    );
    localStorage.setItem(
      'recentVisitedTours',
      JSON.stringify(this.recentVisitedTours)
    );
  }
}
