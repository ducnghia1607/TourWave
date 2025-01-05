import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { Booking } from 'src/app/shared/models/Booking';
import { PaymentResponseModel } from 'src/app/shared/models/PaymentResponseModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout-result',
  templateUrl: './checkout-result.component.html',
  styleUrls: ['./checkout-result.component.css'],
})
export class CheckoutResultComponent implements OnInit {
  booking!: Booking;
  baseUrl: string = '';
  response!: PaymentResponseModel;
  constructor(private bookingService: BookingService) {
    this.baseUrl = environment.apiUrl;
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.add('hidden');
    }
  }
  ngOnInit(): void {
    this.bookingService.updateResultBooking().subscribe((res) => {
      this.response = res;
      console.log(this.response);
    });
  }
  //   this.bookingService.currentBooking$.subscribe((res) => {
  //     if (res) {
  //       this.booking = res;
  //       this.bookingService
  //         .updateResultBooking(this.booking)
  //         .subscribe((res) => {
  //           this.response = res;
  //           console.log(this.response);
  //         });
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.remove('hidden');
    }
  }
}
