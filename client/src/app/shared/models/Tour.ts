import { Schedule } from './Schedule';

export interface Tour {
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
  departureDate: string;
  topPlaces: [];
}
