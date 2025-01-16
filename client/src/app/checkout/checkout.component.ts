import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StripeService } from '../core/services/stripe.service';
import { ConfirmationToken } from '@stripe/stripe-js';
import { firstValueFrom, take } from 'rxjs';
import { BookingService } from '../core/services/booking.service';
import { Booking } from '../shared/models/Booking';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { Tour } from '../shared/models/Tour';
import { TourService } from '../tour/tour.service';
import { ActivatedRoute } from '@angular/router';
import { TourDetail } from '../shared/models/TourDetail';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  confirmationToken!: ConfirmationToken;
  clientFormGroup = this._formBuilder.group({
    gender: ['male', Validators.required],
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    note: [''],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
  });
  isOptional = false;
  paymentUrl!: SafeResourceUrl;
  booking!: Booking;
  tour!: TourDetail;
  user!: User;
  constructor(
    private _formBuilder: FormBuilder,
    private stripeService: StripeService,
    private bookingService: BookingService,
    private domSanitizer: DomSanitizer,
    private tourService: TourService,
    private activedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.bookingService.currentBooking$.subscribe(async (res) => {
      if (res) {
        // var paymentElements = await this.stripeService.createPaymentElement();
        // paymentElements.mount('#payment-element');
      }
    });
    this.accountService.currentUser$.pipe(take(1)).subscribe((res) => {
      if (res) {
        this.user = res;
        this.clientFormGroup.patchValue({
          gender: this.user.gender,
          fullName: this.user.fullName,
          phone: this.user.phone,
          email: this.user.email,
        });
      }
    });
    // this.tourService.getTourById(this.booking.tourId).subscribe((res)=>{
    // })
  }
  async ngOnInit() {
    const state = history.state;
    if (state && state.booking) {
      this.booking = state.booking;
      console.log(this.booking);
    }
    this.activedRoute.data.subscribe({
      next: (data) => {
        this.tour = data['tour'];
        console.log(this.tour);
      },
    });
  }

  async getConfirmationToken() {
    try {
      // Check status stepper
      const result = await this.stripeService.createConfirmationToken();
      if (result.error) throw new Error(result.error.message);
      this.confirmationToken = result.confirmationToken;
      console.log(this.confirmationToken);
    } catch (error) {
      console.log(error);
    }
  }

  // async selectionChangeHandle($event: any) {
  //   console.log($event);
  //   var value = $event;
  //   if (value.selectedIndex == '0') {
  //   }
  //   if (value.selectedIndex == '1') {
  //     // var paymentElements = await this.stripeService.createPaymentElement();
  //     // paymentElements.mount('#payment-element');
  //     // await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
  //     this.bookingService.addNewBooking(this.booking).subscribe((res) => {
  //       if (res) {
  //         // console.log(res);
  //         this.booking = { ...this.booking, id: res.id };
  //         window.location.href = res.paymentUrl;
  //         this.bookingService.setBooking(this.booking);
  //       }

  //       // this.paymentUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
  //       //   res.paymentUrl
  //       // );
  //     });
  //   } else if (value.selectedIndex == '2') {
  //     // await this.getConfirmationToken();
  //   }
  // }

  checkOutBtnClicked() {
    if (this.clientFormGroup.invalid) return;

    this.booking.fullName = this.clientFormGroup.controls['fullName'].value
      ? this.clientFormGroup.controls['fullName'].value
      : '';
    this.booking.phone = this.clientFormGroup.controls['phone'].value
      ? this.clientFormGroup.controls['phone'].value
      : '';
    this.booking.gender = this.clientFormGroup.controls['gender'].value
      ? this.clientFormGroup.controls['gender'].value
      : '';
    this.booking.email = this.clientFormGroup.controls['email'].value
      ? this.clientFormGroup.controls['email'].value
      : '';
    this.booking.note = this.clientFormGroup.controls['note'].value
      ? this.clientFormGroup.controls['note'].value
      : '';
    this.bookingService.addNewBooking(this.booking).subscribe({
      next: (res) => {
        if (res) {
          this.booking = { ...this.booking, id: res.id };
          window.location.href = res.paymentUrl;
          this.bookingService.setBooking(this.booking);
        }
      },
    });
  }
}
