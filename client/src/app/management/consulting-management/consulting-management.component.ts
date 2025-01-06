import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, Cons, map, merge, of, startWith, switchMap } from 'rxjs';
import { ConsultingResponse } from 'src/app/shared/models/ConsultingResponse';
import { ManagementService } from '../management.service';
import { Pagination } from 'src/app/shared/models/Pagination';
import { faStreetView, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faEye } from '@fortawesome/free-regular-svg-icons';
import { DatePipe } from '@angular/common';
import { ConsultingDialogViewComponent } from '../consulting-dialog-view/consulting-dialog-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-consulting-management',
  templateUrl: './consulting-management.component.html',
  styleUrls: ['./consulting-management.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultingManagementComponent {
  selectedDate!: Date;
  filterValue!: string;
  searchButtonClicked() {
    this.managementService!.getListOfConsulting(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!,
      this.filterValue
    ).subscribe((data) => {
      this.data = data.data;
      this.resultsLength = data.count;
    });
  }

  consulting!: ConsultingResponse;
  deleteConsulting(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.confirm.subscribe((confirm) => {
      if (confirm == '2') {
        return;
      } else {
        if (!id) return;
        this.managementService.deleteConsulting(id).subscribe(() => {
          this.data = this.data.filter((x) => x.id !== id);
        });
      }
    });
  }
  viewConsulting(id: number) {
    this.managementService.getConsulting(id).subscribe((res) => {
      if (res) {
        this.consulting = res;
        // console.log(res);
        this.openDialog(this.consulting);
      }
    });
  }
  updateStatus(id: number) {
    this.managementService.updateStatusConsulting(id).subscribe((res) => {
      this.data = this.data.map((x) => {
        if (x.id === id) {
          x = res;
        }
        return x;
      });
    });
  }
  openDialog(data: ConsultingResponse) {
    const dialogRef = this.dialog.open(ConsultingDialogViewComponent, {
      data: {
        consulting: data,
      },
      width: '400px',
    });
  }

  displayedColumns: string[] = [
    'STT',
    'CreatedAt',
    'FullName',
    'Phone',
    'Email',
    'Status',
    'TourCode',
    'Action',
  ];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  data!: ConsultingResponse[];
  filteredData!: ConsultingResponse[]; // Biến lưu trữ dữ liệu đã lọc

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
          return this.managementService!.getListOfConsulting(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!,
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
          var response = data as Pagination<ConsultingResponse[]>;
          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = response.count;
          return response.data;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  faEye = faEye as IconProp;
  faTrash = faTrash as IconProp;
  faCheckCircle = faCheckCircle as IconProp;
}
