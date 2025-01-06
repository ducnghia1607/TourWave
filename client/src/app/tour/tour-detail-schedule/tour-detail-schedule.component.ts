import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
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
export class TourDetailScheduleComponent implements OnInit {
  minDate!: Date;
  maxDate!: Date;
  ngOnInit(): void {
    if (this.schedules?.length && this.schedules.at(0)?.departureDate) {
      const minDate = this.schedules.at(0)?.departureDate;
      const maxDate = this.schedules.at(-1)?.departureDate;
      if (minDate) {
        this.selectedDate = new Date(minDate);
        this.minDate = new Date(minDate);
      }
      if (maxDate) {
        this.maxDate = new Date(maxDate);
      }
    }
  }
  @Input() schedules: Schedule[] = [];
  @Input() price!: number;
  @Output() selectedRowChange = new EventEmitter<Schedule>();
  selectedDate: Date | null = null;
  displayedColumns: string[] = [
    'Ngày khởi hành',
    'Ngày về',
    'Tình trạng chỗ',
    'Giá',
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
