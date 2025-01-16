import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, startWith } from 'rxjs';
import { Schedule } from 'src/app/shared/models/Schedule';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-tour-detail-schedule',
  templateUrl: './tour-detail-schedule.component.html',
  styleUrls: ['./tour-detail-schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SharedModule, CommonModule],
})
export class TourDetailScheduleComponent implements OnInit, AfterViewInit {
  minDate!: Date;
  // maxDate!: Date;
  constructor(private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.minDate = new Date();
    if (this.selectedDate == null) this.selectedDate = new Date();
    // if (this.schedules?.length && this.schedules.at(0)?.departureDate) {
    //   const minDate = this.schedules.at(0)?.departureDate;
    //   const maxDate = this.schedules.at(-1)?.departureDate;
    //   if (minDate) {
    //     this.selectedDate = new Date(minDate);
    //     this.minDate = new Date(minDate);
    //   }
    //   if (maxDate) {
    //     this.maxDate = new Date(maxDate);
    //   }
    // }
  }
  @Input() schedules: Schedule[] = [];
  @Input() resultsLength!: number;
  @Input() tourPrice!: number;
  @Output() selectedRowChange = new EventEmitter<Schedule>();
  @Output() departureDateChange = new EventEmitter<Date>();
  @Output() pageChange = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedDate: Date | null = null;
  displayedColumns: string[] = [
    'departureDate',
    'returnDate',
    'remainingSpot',
    'priceAdult',
  ];
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // startWith: Emits the given value first. tự động emit value do đó có thể tận dụng để lấy data lần đầu tiên
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}))
      .subscribe(() => {
        this.pageChange.emit({
          sortActive: this.sort.active,
          sortDirection: this.sort.direction,
          pageIndex: this.paginator.pageIndex + 1,
          selectedDate:
            this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') == ''
              ? this.datePipe.transform(new Date(), 'yyyy-MM-dd')
              : this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd'),
        });
      });
    // .pipe(
    //   startWith({}),
    //   switchMap(() => {
    //     // this.isLoadingResults = true;
    //     return this.tourService!.getAllScheduleForTour(
    //       this.sort.active,
    //       this.sort.direction,
    //       this.paginator.pageIndex,
    //       this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!,
    //       this.tourEdit.id
    //     ).pipe(catchError(() => of(null)));
    //   }),
    //   map((data) => {
    //     // Flip flag to show that loading has finished.
    //     // this.isLoadingResults = false;
    //     // this.isRateLimitReached = data === null;

    //     if (data === null) {
    //       return [];
    //     }
    //     var response = data as Pagination<Schedule[]>;
    //     this.resultsLength = response.count;
    //     return response.data;
    //   })
    // )
    // .subscribe((data) => (this.schedules = data));
  }
  onDateChange($event: any) {
    this.departureDateChange.emit($event.value);
  }
  clickedRows = new Set<Schedule>();

  OnRowClicked(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.clear();
      this.clickedRows.add(row);
      console.log(row);
      this.selectedRowChange.emit(row);
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = new Date(cellDate.getTime()).toDateString();
      var item = this.schedules.findIndex((item, i) => {
        var dt = new Date(item.departureDate).toDateString();
        return date == dt;
      });
      return item != -1 ? 'example-custom-date-class' : '';
    }

    return '';
  };
}
