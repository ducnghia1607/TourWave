import { Itinerary } from './Itinarary';
import { ItineraryUpdate } from './ItineraryUpdate';
import { Schedule } from './Schedule';

export interface TourEdit {
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
  itineraries: ItineraryUpdate[];
  schedules: Schedule[];
  tourWithType: string[];
  transport: string[];
  topPlaces: string[];
  createdAt: Date;
}

export interface Image {
  id: number;
  url: string;
  caption: string;
  publicId: string;
}
