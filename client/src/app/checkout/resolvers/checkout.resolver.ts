import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TourDetail } from 'src/app/shared/models/TourDetail';
import { TourService } from 'src/app/tour/tour.service';

export const checkoutResolver: ResolveFn<TourDetail> = (route, state) => {
  const tourSerivce = inject(TourService);
  // console.log(
  //   route.paramMap.get('title')!,
  //   route.paramMap.get('tourCode')!,
  //   route.queryParamMap.get('date')!
  // );
  console.log(route.queryParamMap.get('id')!);
  return tourSerivce.getTourById(route.queryParamMap.get('id')!);
};
