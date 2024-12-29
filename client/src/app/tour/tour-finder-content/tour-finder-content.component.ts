import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/shared/models/Pagination';
import { Tour } from 'src/app/shared/models/Tour';

@Component({
  selector: 'app-tour-finder-content',
  templateUrl: './tour-finder-content.component.html',
  styleUrls: ['./tour-finder-content.component.css'],
})
export class TourFinderContentComponent implements OnInit {
  ngOnInit(): void {
    if (this.tourPagination) {
      this.pageNumber = this.tourPagination.pageIndex;
    }
  }
  @Input() tourPagination!: Pagination<Tour[]>;
  @Output() ChangePageNumber = new EventEmitter<number>();
  pageNumber: number = 1;
  pageNumberChanged($event: any) {
    this.pageNumber = $event;
    this.ChangePageNumber.emit(this.pageNumber);
  }
}
