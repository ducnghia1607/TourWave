import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ManagementService } from '../management.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faTrash,
  faCheckCircle,
  faPlus,
  faTrashCan,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { merge, startWith, switchMap, catchError, of, map } from 'rxjs';
import { Pagination } from 'src/app/shared/models/Pagination';
import { Tour } from 'src/app/shared/models/Tour';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TourService } from 'src/app/tour/tour.service';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TourManagementComponent {
  filterValue!: string;
  searchButtonClicked() {
    this.managementService!.getListOfTours(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.filterValue
    ).subscribe((data) => {
      this.data = data.data;
      this.resultsLength = data.count;
    });
  }

  tour!: Tour;
  // viewConsulting(id: number) {
  //   this.managementService.getConsulting(id).subscribe((res) => {
  //     if (res) {
  //       this.consulting = res;
  //       this.openDialog(this.consulting);
  //     }
  //   });
  // }

  // openDialog(data: ConsultingResponse) {
  //   const dialogRef = this.dialog.open(ConsultingDialogViewComponent, {
  //     data: {
  //       data,
  //     },
  //   });
  // }

  displayedColumns: string[] = [
    'STT',
    'tourCode',
    'tourTitle',
    'duration',
    'priceAdult',
    'priceChild',
    'departure',
    'destination',
  ];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  data!: Tour[];
  booking!: Tour;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private managementService: ManagementService,
    private tourService: TourService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.managementService!.getListOfTours(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.filterValue
          ).pipe(catchError(() => of(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          var response = data as Pagination<Tour[]>;
          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = response.count;
          return response.data;
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }
  currentTourCode!: string;
  currentTourTitle!: string;
  currentTourId!: number;
  clickedRows = new Set<Tour>();

  OnRowClicked(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
      this.currentTourCode = '';
      this.currentTourTitle = '';
      this.currentTourCode = '';
    } else {
      this.clickedRows.clear();
      this.clickedRows.add(row);
      console.log(row);
      this.currentTourCode = row.tourCode;
      this.currentTourTitle = row.title;
      this.currentTourId = row.id;
    }
  }
  goToTourDetail() {
    if (this.currentTourCode === '' || this.currentTourTitle === '') return;
    this.router.navigate([
      '/tours',
      this.currentTourTitle,
      this.currentTourCode,
    ]);
  }
  deleteTour() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.confirm.subscribe((confirm) => {
      if (confirm == '2') {
        return;
      } else {
        if (this.currentTourId === 0) return;
        this.tourService.deleteTour(this.currentTourId).subscribe((res) => {
          console.log(res);
          this.data = this.data.filter((tour) => tour.id != this.currentTourId);
          this.currentTourCode = '';
          this.currentTourId = 0;
        });
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editTour() {
    if (this.currentTourId == 0 || this.currentTourCode === '') return;
    this.router.navigate(['/management/edit-tour/', this.currentTourId]);
  }

  editScheduleTour() {
    if (this.currentTourId == 0 || this.currentTourCode === '') return;
    this.router.navigate([
      '/management/edit-schedule-tour/',
      this.currentTourId,
    ]);
  }
  faEye = faEye as IconProp;
  faTrash = faTrash as IconProp;
  faCheckCircle = faCheckCircle as IconProp;
  faPlus = faPlus as IconProp;
  faPenToSquare = faPenToSquare as IconProp;
  faCalender = faCalendar as IconProp;
}
