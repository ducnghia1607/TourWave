import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Pagination } from 'src/app/shared/models/Pagination';
import { Schedule } from 'src/app/shared/models/Schedule';
import { TourService } from 'src/app/tour/tour.service';

export const tourScheduleResolver: ResolveFn<Pagination<Schedule[]>> = (
  route,
  state
) => {
  var tourService = inject(TourService);
  return tourService.getAllScheduleForTour(Number(route.paramMap.get('id')!));
};
