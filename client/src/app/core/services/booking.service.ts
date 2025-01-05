import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';
import { Booking } from 'src/app/shared/models/Booking';
import { PaymentResponseModel } from 'src/app/shared/models/PaymentResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  baseUrl = environment.apiUrl;
  // currentBookingSource = new BehaviorSubject<Booking | null>(null);
  currentBookingSource = new ReplaySubject<Booking>(1);
  currentBooking$ = this.currentBookingSource.asObservable();
  constructor(private http: HttpClient) {}

  getBooking(bookingId: number) {
    return this.http.get<Booking>(this.baseUrl + 'bookings/' + bookingId);
  }
  setBooking(booking: Booking) {
    this.currentBookingSource.next(booking);
  }

  addNewBooking(booking: Booking) {
    return this.http.post<any>(this.baseUrl + 'bookings', booking);
  }
  updateResultBooking() {
    const queryString = window.location.href.split('?')[1];
    return this.http.post<PaymentResponseModel>(
      this.baseUrl + 'bookings/update-result?' + queryString,
      {}
    );
  }
}
