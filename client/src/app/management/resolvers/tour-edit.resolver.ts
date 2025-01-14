import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TourDetail } from 'src/app/shared/models/TourDetail';
import { TourEdit } from 'src/app/shared/models/TourEdit';
import { TourService } from 'src/app/tour/tour.service';

export const tourEditResolver: ResolveFn<TourEdit> = (route, state) => {
  var tourService = inject(TourService);
  return tourService.getTourToEdit(route.paramMap.get('id')!);
};
