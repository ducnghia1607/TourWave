import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { Booking } from 'src/app/shared/models/Booking';
import { PaymentResponseModel } from 'src/app/shared/models/PaymentResponseModel';
import { environment } from 'src/environments/environment';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-result',
  templateUrl: './checkout-result.component.html',
  styleUrls: ['./checkout-result.component.css'],
})
export class CheckoutResultComponent implements OnInit {
  booking!: Booking;
  baseUrl: string = '';
  response!: PaymentResponseModel;
  publicKey = environment.publicKey;
  templateSuccessId = environment.templateSuccessId;
  templateCounterId = environment.templateCounterId;
  serviceId = environment.serviceId;
  hasEmailSent = false;
  emailSentKey = 'email_sent';
  paymentType = '';
  constructor(
    private bookingService: BookingService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private router: Router,
    private accountService: AccountService
  ) {
    this.baseUrl = environment.apiUrl;
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.add('hidden');
    }
    // var extras = this.router.getCurrentNavigation()?.extras;
    // if (extras) {
    //   this.booking = extras.state as Booking;
    //   this.paymentType = this.booking.paymentType;
    // }
  }
  ngOnInit(): void {
    // Kiểm tra xem email đã gửi trước đó chưa
    this.accountService.currentUser$.subscribe((res) => {
      if (res == null) return;
      const state = history.state;
      if (state && state.booking) {
        this.booking = state.booking;
        this.paymentType = this.booking.paymentType;
        // console.log(this.booking);
      }
      this.hasEmailSent = localStorage.getItem(this.emailSentKey) === 'true';
      if (this.paymentType == '2') {
        if (this.hasEmailSent) return;
        console.log(this.booking);
        this.bookingService
          .getBooking(this.booking.id)
          .subscribe((res: any) => {
            console.log(res);
            var mailForm = {
              gender: this.booking.gender == 'male' ? 'Anh' : 'Chị',
              to_name: this.booking.fullName,
              tour_title: res.tourTitle,
              departure_date: this.datePipe.transform(
                this.booking.departureDate,
                'EEEEE, dd/MM/YYYY'
              ),
              return_date: this.datePipe.transform(
                this.booking.returnDate,
                'EEEEE, dd/MM/YYYY'
              ),
              adult_num: this.booking.numAdults,
              child_num: this.booking.numChildren,
              total_price: this.currencyPipe.transform(
                this.booking.numAdults * this.booking.pricePerAdult +
                  this.booking.numChildren * this.booking.pricePerChild,
                'VND',
                'symbol',
                '1.0-0'
              ),
              departure_place: res.departure,
              receiver_email: this.booking.email,
            };
            this.sendEmail(mailForm, this.templateCounterId);
          });
      } else {
        this.bookingService.updateResultBooking().subscribe((res: any) => {
          this.response = res;
          console.log(this.response);
          if (res.vnPayResponseCode == '00') {
            if (this.hasEmailSent) return;
            var mailForm = {
              transaction_id: res.transactionId,
              gender: res.booking.gender == 'male' ? 'Anh' : 'Chị',
              to_name: res.booking.fullName,
              tour_title: res.booking.tour.title,
              departure_date: this.datePipe.transform(
                res.booking.departureDate,
                'EEEEE, dd/MM/YYYY'
              ),
              return_date: this.datePipe.transform(
                res.booking.returnDate,
                'EEEEE, dd/MM/YYYY'
              ),
              adult_num: res.booking.numAdults,
              child_num: res.booking.numChildren,
              total_price: this.currencyPipe.transform(
                res.booking.numAdults * res.booking.pricePerAdult +
                  res.booking.numChildren * res.booking.pricePerChild,
                'VND',
                'symbol',
                '1.0-0'
              ),
              departure_place: res.booking.tour.departure,
              receiver_email: res.booking.email,
            };
            this.sendEmail(mailForm, this.templateSuccessId);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.remove('hidden');
    }
  }

  public sendEmail(emailForm: any, templateId: string) {
    emailjs
      .send(this.serviceId, templateId, emailForm, {
        publicKey: this.publicKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          this.hasEmailSent = true;
          // Lưu trạng thái email đã gửi vào localStorage
          localStorage.setItem(this.emailSentKey, 'true');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        }
      );
  }
}
