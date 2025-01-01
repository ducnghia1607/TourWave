import { Schedule } from './Schedule';
import { TourWithType } from './TourWithType';
export interface TourToRecommend {
  id: number;
  title: string;
  tourCode: string;
  duration: string;
  priceAdult: number;
  priceChild: number;
  imageUrl: string;
  tourWithType: TourWithType[];
  schedules: Schedule[];
  priceSuitability: number;
  historySuitability: number;
  dateSuitability: number;
  hobbySuitability: number;
  totalSuitability: number;
}
