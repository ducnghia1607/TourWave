import { Injectable } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeAddressElement,
  StripeAddressElementOptions,
  StripeElement,
  StripeElements,
  StripePaymentElement,
} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { BookingService } from './booking.service';
import { Booking } from 'src/app/shared/models/Booking';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  baseUrl = environment.apiUrl;
  private stripePromise: Promise<Stripe | null>;
  private stripeElements?: StripeElements;
  private booking!: Booking;
  private addressElement?: StripeAddressElement;
  private paymentElement?: StripePaymentElement;
  constructor(
    private bookingService: BookingService,
    private http: HttpClient
  ) {
    this.bookingService.currentBooking$.subscribe((res) => {
      if (res) this.booking = res;
      console.log(this.booking);
    });
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  getStripeInstance() {
    return this.stripePromise;
  }

  async createAddressElement() {
    if (!this.addressElement) {
      const elements = await this.initializeElements();
      if (elements) {
        const options: StripeAddressElementOptions = {
          mode: 'shipping',
        };
        this.addressElement = elements.create('address', options);
      } else {
        throw new Error('Stripe Elements not available');
      }
    }
    return this.addressElement;
  }

  async createPaymentElement() {
    if (!this.paymentElement) {
      const elements = await this.initializeElements();
      if (elements) {
        this.paymentElement = elements.create('payment');
      } else {
        throw new Error('Stripe Elements not available');
      }
    }
    return this.paymentElement;
  }

  async initializeElements() {
    if (!this.stripeElements) {
      const stripe = await this.getStripeInstance();
      if (stripe) {
        const booking = await firstValueFrom(
          this.createOrUpdatePaymentIntent()
        );
        this.stripeElements = stripe.elements({
          clientSecret: this.booking.clientSecret,
          appearance: { labels: 'floating' },
        });
        // if(elements ) this.stripeElements = elements;
      } else {
        throw new Error('Stripe has not been loaded');
      }
    }
    return this.stripeElements;
  }

  async createConfirmationToken() {
    const stripe = await this.getStripeInstance();
    const elements = await this.initializeElements();
    const result = await elements.submit();
    if (result.error) throw new Error(result.error.message);
    if (stripe) {
      return await stripe.createConfirmationToken({ elements });
    } else {
      throw new Error('Stripe not available');
    }
  }
  createOrUpdatePaymentIntent() {
    if (!this.booking) {
      throw new Error('Problem with booking');
    }
    return this.http
      .post<Booking>(this.baseUrl + 'payments/' + this.booking.id, {})
      .pipe(
        map((booking) => {
          this.bookingService.setBooking(booking);
          return booking;
        })
      );
  }

  disposeElements() {
    this.stripeElements = undefined;
    this.paymentElement = undefined;
    this.addressElement = undefined;
  }
}
