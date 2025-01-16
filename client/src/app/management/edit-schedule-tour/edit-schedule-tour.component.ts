import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBackward,
  faDongSign,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Schedule } from 'src/app/shared/models/Schedule';
import { TourEdit } from 'src/app/shared/models/TourEdit';
import { TourService } from 'src/app/tour/tour.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { Pagination } from 'src/app/shared/models/Pagination';
import { StringUtility } from 'src/app/shared/models/StringUtility';

@Component({
  selector: 'app-edit-schedule-tour',
  templateUrl: './edit-schedule-tour.component.html',
  styleUrls: ['./edit-schedule-tour.component.css'],
})
export class EditScheduleTourComponent implements OnInit, AfterViewInit {
  schedules: Schedule[] = [];
  tourEdit!: TourEdit;
  faDongSign = faDongSign as IconProp;
  currentScheduleId: number = 0;
  datenow: string = '';
  minDate: Date = new Date();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  editMode = false;
  editScheduleId: number = 0;
  dayOfTour: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  goBack() {
    this.router.navigateByUrl('/management/tours');
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.tourEdit = data['tourEdit'];
    });
    this.datenow = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '';
    console.log(this.datenow);

    this.dayOfTour =
      StringUtility.getDayOfTour(this.tourEdit.duration) == 0
        ? 0
        : StringUtility.getDayOfTour(this.tourEdit.duration) - 1;
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          // this.isLoadingResults = true;
          this.tourService.setScheduleParams({
            sortActive: this.sort.active,
            sortDirection: this.sort.direction,
            pageIndex: this.paginator.pageIndex + 1,
            selectedDate:
              this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') ?? '',
          });
          return this.tourService!.getAllScheduleForTour(this.tourEdit.id).pipe(
            catchError(() => of(null))
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          // this.isLoadingResults = false;
          // this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          var response = data as Pagination<Schedule[]>;
          this.resultsLength = response.count;
          console.log(response.data);
          return response.data;
        })
      )
      .subscribe((data) => {
        this.schedules = data;
        this.schedulesEdit.clear();
        this.schedules.forEach((item) => {
          this.addEditSchedule(item);
        });
      });
  }
  createNewSchedule() {
    var schedules = this.scheduleArray.value;
    schedules = schedules.map((item: any) => {
      return {
        departureDate: this.datePipe.transform(
          item.departureDate,
          'yyyy-MM-dd'
        ),
        returnDate: this.datePipe.transform(item.returnDate, 'yyyy-MM-dd'),
        priceAdult: item.priceAdult,
        priceChild: item.priceChild,
        tourId: this.tourEdit.id,
      };
    });
    this.tourService
      .addSchedulesForTour(this.tourEdit.id, schedules)
      .subscribe((res) => {
        this.schedules = res;
        this.schedules = this.schedules.sort((a, b) => {
          return (
            new Date(b.departureDate).getTime() -
            new Date(a.departureDate).getTime()
          );
        });
        this.schedulesEdit.clear();
        this.schedules.forEach((item) => {
          this.addEditSchedule(item);
        });
        this.scheduleArray.clear();
      });
  }
  @Input() price!: number;
  @Output() selectedRowChange = new EventEmitter<Schedule>();
  selectedDate: Date | null = null;
  displayedColumns: string[] = [
    'departureDate',
    'returnDate',
    'remainingSpot',
    'priceAdult',
    'priceChild',
    'action',
  ];
  @Output() departureDateChange = new EventEmitter<Date>();
  onDateChange($event: any) {
    var params = this.tourService.getScheduleParams();
    params = {
      ...params,
      pageIndex: 1,
      selectedDate:
        this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') ?? '',
    };
    this.tourService.setScheduleParams(params);
    this.tourService!.getAllScheduleForTour(this.tourEdit.id).subscribe(
      (data) => {
        this.schedules = data.data;
        this.resultsLength = data.count;
      }
    );
  }
  clickedRows = new Set<Schedule>();

  OnRowClicked(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.clear();
      this.clickedRows.add(row);
      this.currentScheduleId = row.id;
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
  tourForm!: FormGroup;
  editScheduleForm!: FormGroup;
  constructor(
    private tourService: TourService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {
    this.tourForm = this.fb.group({
      title: ['', Validators.required],
      departure: ['', Validators.required],
      tourWithType: ['', Validators.required],
      transport: ['', Validators.required],
      description: ['', Validators.required],
      priceAdult: ['', Validators.required],
      priceChild: ['', Validators.required],
      schedules: this.fb.array([]),
      itineraries: this.fb.array([]), // FormArray cho lịch trình
    });
    this.editScheduleForm = this.fb.group({
      schedules: this.fb.array([]), // FormArray to manage rows
    });
  }
  equalDuration(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      console.log(control, control.parent);
      if (
        control.parent == null ||
        control.parent == undefined ||
        control.parent?.get(matchTo)?.value == null
      )
        return null;
      return this.getDayDifference(
        control.value,
        control.parent?.get(matchTo)?.value
      ) == this.dayOfTour
        ? null
        : { notEqualDuration: true };
    };
  }
  dateGreater(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (
        control.parent == null ||
        control.parent == undefined ||
        control.parent?.get(matchTo)?.value == null
      )
        return null;
      return new Date(control.value) >
        new Date(control.parent?.get(matchTo)?.value)
        ? null
        : this.dayOfTour == 0
        ? null
        : { notGreater: true };
    };
  }
  greaterThanToday(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value == null || control.value == '') return null;
      var controlDate = new Date(control.value);
      controlDate.setHours(0, 0, 0, 0);
      var todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      return controlDate.getTime() >= todayDate.getTime()
        ? null
        : { notGreaterThanToday: true };
    };
  }
  editScheduleClick(scheduleId: number) {
    if (this.editMode) {
      return;
    }
    this.editScheduleId = scheduleId;
    this.editMode = true;
  }

  saveScheduleClick(id: number, idx: number) {
    var schedule = this.schedulesEdit.at(idx).value;
    var scheduleDto = {
      departureDate: this.datePipe.transform(
        schedule.departureDate,
        'yyyy-MM-dd'
      ),
      returnDate: this.datePipe.transform(schedule.returnDate, 'yyyy-MM-dd'),
      priceAdult: schedule.priceAdult,
      priceChild: schedule.priceChild,
    };
    console.log(scheduleDto);
    this.tourService
      .updateScheduleForTour(id, this.tourEdit.id, scheduleDto)
      .subscribe(() => {
        this.editMode = false;
        this.editScheduleId = 0;
        this.tourService!.getAllScheduleForTour(this.tourEdit.id).subscribe(
          (data) => {
            this.schedules = data.data;
            this.resultsLength = data.count;
          }
        );
      });
  }

  cancelEditClick(idx: number, id: number) {
    var schedule = this.schedules.find((item) => item.id == id);
    this.schedulesEdit.at(idx).patchValue(schedule);
    this.editMode = false;
    this.editScheduleId = 0;
  }

  // Add a new FormGroup to the FormArray
  addEditSchedule(schedule?: any): void {
    const scheduleGroup = this.fb.group({
      departureDate: [schedule?.departureDate || '', Validators.required],
      returnDate: [
        schedule?.returnDate || '',
        {
          validators: [
            Validators.required,
            this.equalDuration('departureDate'),
            this.dateGreater('departureDate'),
          ],
        },
      ],
      priceAdult: [schedule?.priceAdult || '', Validators.required],
      priceChild: [schedule?.priceChild || '', Validators.required],
    });
    this.schedulesEdit.push(scheduleGroup);
    var currentIdx = this.schedulesEdit.length - 1;
    this.schedulesEdit
      .at(currentIdx)
      ?.get('departureDate')
      ?.valueChanges.subscribe(() => {
        this.schedulesEdit
          .at(currentIdx)
          ?.get('returnDate')
          ?.updateValueAndValidity();
      });
  }

  // Getter for the FormArray
  get schedulesEdit(): FormArray {
    return this.editScheduleForm.get('schedules') as FormArray;
  }

  get scheduleArray() {
    return this.tourForm.get('schedules') as FormArray;
  }

  // Hàm thêm lịch trình
  addSchedule() {
    const scheduleForm = this.fb.group({
      departureDate: ['', this.greaterThanToday()],
      returnDate: [
        '',
        {
          validators: [
            Validators.required,
            this.equalDuration('departureDate'),
            this.dateGreater('departureDate'),
            this.greaterThanToday(),
          ],
        },
      ],
      priceAdult: [this.tourEdit.priceAdult],
      priceChild: [this.tourEdit.priceChild],
    });
    this.scheduleArray.push(scheduleForm);
  }

  // Hàm xóa lịch trình
  removeSchedule(index: number) {
    this.scheduleArray.removeAt(index);
  }

  deleteScheduleForTour() {
    if (this.editMode) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance?.confirm.subscribe((confirm) => {
      if (confirm == '2') {
        return;
      } else {
        if (this.currentScheduleId === 0) return;
        this.tourService
          .deleteScheduleForTour(this.tourEdit.id, this.currentScheduleId)
          .subscribe((res) => {
            this.schedules = this.schedules.filter(
              (schedule) => schedule.id != this.currentScheduleId
            );
            this.currentScheduleId = 0;
          });
      }
    });
  }

  faTrash = faTrash as IconProp;
  faPlus = faPlus as IconProp;
  faBackward = faBackward as IconProp;
  faPenToSquare = faPenToSquare as IconProp;

  getDayDifference(date1: string | Date, date2: string | Date): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      throw new Error('Invalid date format');
    }
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0); // Reset thời gian về 00:00:00

    const diffTime = Math.abs(d1.getTime() - d2.getTime());

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }
}
