import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRight,
  faCalendar,
  faCheck,
  faPlane,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';
import { Booking } from 'src/app/shared/models/Booking';
import { TourDetail } from 'src/app/shared/models/TourDetail';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css'],
})
export class CheckoutSummaryComponent implements OnInit {
  @Input() booking!: Booking;
  @Input() tourDetail!: TourDetail;
  faCalendar = faCalendar as IconProp;
  faArrowRight = faArrowRight as IconProp;
  faPlane = faPlane as IconProp;
  faPlaneArrival = faPlaneArrival as IconProp;
  faUser = faUser as IconProp;
  faCheck = faCheck as IconProp;
  ngOnInit(): void {
    const navbarElement = document.getElementById('main-header');
    navbarElement?.classList.remove('hidden');

    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }
  get getTotal() {
    return (
      this.booking.pricePerAdult * this.booking.numAdults +
      this.booking.pricePerChild * this.booking.numChildren
    );
  }
}
