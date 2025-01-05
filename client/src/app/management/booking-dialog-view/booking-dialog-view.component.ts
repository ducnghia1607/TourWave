import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingResponse } from 'src/app/shared/models/BookingResponse';

@Component({
  selector: 'app-booking-dialog-view',
  templateUrl: './booking-dialog-view.component.html',
  styleUrls: ['./booking-dialog-view.component.css'],
})
export class BookingDialogViewComponent {
  booking!: BookingResponse;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.booking = data['booking'];
  }
}
