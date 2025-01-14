import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { EditorComponent } from '@tinymce/tinymce-angular';
import { Schedule } from 'src/app/shared/models/Schedule';
import { TourEdit } from 'src/app/shared/models/TourEdit';
import { TourService } from 'src/app/tour/tour.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-schedule-tour',
  templateUrl: './edit-schedule-tour.component.html',
  styleUrls: ['./edit-schedule-tour.component.css'],
})
export class EditScheduleTourComponent implements OnInit {
  schedules: Schedule[] = [];
  faTrash = faTrash as IconProp;
  faPlus = faPlus as IconProp;
  faBackward = faBackward as IconProp;
  faPenToSquare = faPenToSquare as IconProp;
  tourEdit!: TourEdit;
  faDongSign = faDongSign as IconProp;
  currentScheduleId: number = 0;
  goBack() {
    this.router.navigateByUrl('/management/tours');
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      // this.schedules = data['tourSchedule'];
      this.tourEdit = data['tourEdit'];

      console.log(this.schedules, this.tourEdit);
    });
    this.tourService
      .getAllScheduleForTour(this.tourEdit.id.toString())
      .subscribe((data) => {
        this.schedules = data;
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
      });
  }
  @Input() price!: number;
  @Output() selectedRowChange = new EventEmitter<Schedule>();
  selectedDate: Date | null = null;
  displayedColumns: string[] = [
    'Ngày khởi hành',
    'Ngày về',
    'Tình trạng chỗ',
    'Giá người lớn',
    'Giá trẻ em',
    'Hành động',
  ];
  @Output() departureDateChange = new EventEmitter<Date>();
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
  }

  get scheduleArray() {
    return this.tourForm.get('schedules') as FormArray;
  }

  // Hàm thêm lịch trình
  addSchedule() {
    const scheduleForm = this.fb.group({
      departureDate: [''],
      returnDate: [''],
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance?.confirm.subscribe((confirm) => {
      if (confirm == '2') {
        return;
      } else {
        if (this.currentScheduleId === 0) return;
        this.tourService
          .deleteScheduleForTour(this.tourEdit.id, this.currentScheduleId)
          .subscribe((res) => {
            console.log(res);
            this.schedules = this.schedules.filter(
              (schedule) => schedule.id != this.currentScheduleId
            );
            this.currentScheduleId = 0;
          });
      }
    });
  }
}
