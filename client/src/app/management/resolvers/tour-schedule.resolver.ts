import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Schedule } from 'src/app/shared/models/Schedule';
import { TourService } from 'src/app/tour/tour.service';

export const tourScheduleResolver: ResolveFn<Schedule[]> = (route, state) => {
  var tourService = inject(TourService);
  return tourService.getAllScheduleForTour(route.paramMap.get('id')!);
};
