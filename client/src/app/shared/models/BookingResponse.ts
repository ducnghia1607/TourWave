export interface BookingResponse {
  fullName: string;
  phone: string;
  email: string;
  createdAt: Date;
  note: string;
  id: number;
  paymentStatus: string;
  pricePerChild: number;
  pricePerAdult: number;
  numChildren: number;
  numAdults: number;
  tourTitle: string;
  tourCode: string;
  departureDate: string;
  returnDate: string;
  createDate: Date;
  paymentMethodType: string;
}
