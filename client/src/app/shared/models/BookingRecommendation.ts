import { TourWithType } from './TourWithType';

export interface BookingRecommendation {
  id: number;
  numChildren: number;
  numAdults: number;
  pricePerChild: number;
  pricePerAdult: number;
  paymentStatus: string;
  tourId: number;
  appUserId: number;
  departureDate: string;
  returnDate: string;
  scheduleId: number;
  paymentIntentId: string;
  clientSecret: string;
  paymentMethodType: string;
  createDate: Date;
  status: string;
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  note?: string;
  tour: {
    tourWithType: TourWithType[];
  };
}
