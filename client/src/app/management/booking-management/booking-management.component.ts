import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faTrash,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { merge, startWith, switchMap, catchError, of, map } from 'rxjs';
import { ConsultingResponse } from 'src/app/shared/models/ConsultingResponse';
import { Pagination } from 'src/app/shared/models/Pagination';
import { ConsultingDialogViewComponent } from '../consulting-dialog-view/consulting-dialog-view.component';
import { ManagementService } from '../management.service';
import { BookingResponse } from 'src/app/shared/models/BookingResponse';
import { BookingDialogViewComponent } from '../booking-dialog-view/booking-dialog-view.component';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css'],
})
export class BookingManagementComponent {
  selectedDate!: Date;
  selectedDd!: Date;
  filterValue!: string;
  searchButtonClicked() {
    this.managementService!.getListOfBooking(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!,
      this.filterValue,
      this.datePipe.transform(this.selectedDd, 'yyyy-MM-dd')!
    ).subscribe((data) => {
      this.data = data.data;
      this.resultsLength = data.count;
    });
  }

  // consulting!: ConsultingResponse;
  // viewConsulting(id: number) {
  //   this.managementService.getConsulting(id).subscribe((res) => {
  //     if (res) {
  //       this.consulting = res;
  //       this.openDialog(this.consulting);
  //     }
  //   });
  // }

  openDialog(data: ConsultingResponse) {
    const dialogRef = this.dialog.open(ConsultingDialogViewComponent, {
      data: {
        data,
      },
    });
  }

  displayedColumns: string[] = [
    'STT',
    'createdAt',
    'fullName',
    'phone',
    'amount',
    'paymentStatus',
    'tourCode',
    'schedule',
  ];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  data!: BookingResponse[];
  booking!: BookingResponse;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private managementService: ManagementService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.managementService!.getListOfBooking(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!,
            this.filterValue,
            this.datePipe.transform(this.selectedDd, 'yyyy-MM-dd')!
          ).pipe(catchError(() => of(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          var response = data as Pagination<BookingResponse[]>;
          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = response.count;
          return response.data;
        })
      )
      .subscribe((data) => {
        this.data = data;
        this.data.forEach((e) => {
          var dd = this.datePipe.transform(
            new Date(e.departureDate),
            'EEEEE, dd/MM/YYYY'
          );
          var rd = this.datePipe.transform(
            new Date(e.returnDate),
            'EEEEE, dd/MM/YYYY'
          );
          if (dd) e.departureDate = dd;
          if (rd) e.returnDate = rd;
        });
      });
  }

  faEye = faEye as IconProp;
  faTrash = faTrash as IconProp;
  faCheckCircle = faCheckCircle as IconProp;
  viewDetailBooking(id: number) {
    this.managementService.getBooking(id).subscribe((res) => {
      if (res) {
        this.booking = res;
        this.dialog.open(BookingDialogViewComponent, {
          data: {
            booking: this.booking,
          },
        });
      }
    });
  }
}
