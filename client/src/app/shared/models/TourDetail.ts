import { Itinerary } from './Itinarary';
import { ReviewResponse } from './ReviewResponse';
import { Schedule } from './Schedule';
import { Tour } from './Tour';
import { TourWithType } from './TourWithType';

export interface TourDetail extends Tour {
  id: number;
  title: string;
  tourCode: string;
  duration: string;
  description: string;
  priceAdult: number;
  priceChild: number;
  imageUrl: string;
  departure: string;
  destination: string;
  utilities: string[];
  images: Image[];
  itineraries: Itinerary[];
  schedules: Schedule[];
  reviews: ReviewResponse[];
  tourWithType: TourWithType[];
}

export interface Image {
  url: string;
  caption: string;
}
