import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { catchError, map, merge, of, startWith, switchMap, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { ManagementService } from 'src/app/management/management.service';
import { BookingResponse } from 'src/app/shared/models/BookingResponse';
import { Pagination } from 'src/app/shared/models/Pagination';
import { Tour } from 'src/app/shared/models/Tour';
import { User } from 'src/app/shared/models/User';
import { TourService } from '../tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.css'],
})
export class MyTripComponent implements AfterViewInit {
  isTabActive = '1';
  displayedColumns: string[] = [
    'STT',
    'tourCode',
    'tourTitle',
    'quantity',
    'price',
    'createdAt',
    'date',
  ];
  faUser = faUser as IconProp;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  booking!: Tour;
  data!: BookingResponse[];
  tourHistory: BookingResponse[] = [];
  tourFuture: BookingResponse[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  user!: User;
  constructor(
    private managementService: ManagementService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private accountService: AccountService,
    private tourService: TourService,
    private router: Router
  ) {
    this.accountService.currentUser$.subscribe((res) => {
      if (res) {
        this.user = res;
        this.tourService!.getListOfBookingForUser(
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.user.id
        )
          .pipe(
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
            this.tourHistory = this.data.filter((tour) => {
              return new Date(tour.returnDate) < new Date();
            });
            this.tourFuture = this.data.filter((tour) => {
              return new Date(tour.departureDate) >= new Date();
            });
            this.tourHistory.forEach((e) => {
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

            this.tourFuture.forEach((e) => {
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
        console.log(res);
      }
    });
  }

  OnRowClicked($event: any) {
    if ($event) this.router.navigate(['/tours', $event.id]);
  }

  // ngOnInit(): void {}

  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;
  // data!: BookingResponse[];
  // booking!: BookingResponse;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  // constructor(
  //   private managementService: ManagementService,
  //   private datePipe: DatePipe,
  //   public dialog: MatDialog
  // ) {}

  // ngAfterViewInit() {
  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         return this.managementService!.getListOfBooking(
  //           this.sort.active,
  //           this.sort.direction,
  //           this.paginator.pageIndex,
  //           this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!,
  //           this.filterValue,
  //           this.datePipe.transform(this.selectedDd, 'yyyy-MM-dd')!
  //         ).pipe(catchError(() => of(null)));
  //       }),
  //       map((data) => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = data === null;

  //         if (data === null) {
  //           return [];
  //         }
  //         var response = data as Pagination<BookingResponse[]>;
  //         // Only refresh the result length if there is new data. In case of rate
  //         // limit errors, we do not want to reset the paginator to zero, as that
  //         // would prevent users from re-triggering requests.
  //         this.resultsLength = response.count;
  //         return response.data;
  //       })
  //     )
  //     .subscribe((data) => {
  //       this.data = data;
  //       this.data.forEach((e) => {
  //         var dd = this.datePipe.transform(
  //           new Date(e.departureDate),
  //           'EEEEE, dd/MM/YYYY'
  //         );
  //         var rd = this.datePipe.transform(
  //           new Date(e.returnDate),
  //           'EEEEE, dd/MM/YYYY'
  //         );
  //         if (dd) e.departureDate = dd;
  //         if (rd) e.returnDate = rd;
  //       });
  //     });
  // }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          if (this.user == null) return of(null);
          this.isLoadingResults = true;
          return this.tourService!.getListOfBookingForUser(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.user.id
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
        this.tourHistory = this.data.filter((tour) => {
          return new Date(tour.returnDate) < new Date();
        });
        this.tourFuture = this.data.filter((tour) => {
          return new Date(tour.departureDate) >= new Date();
        });
        this.tourHistory.forEach((e) => {
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

        this.tourFuture.forEach((e) => {
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
}
