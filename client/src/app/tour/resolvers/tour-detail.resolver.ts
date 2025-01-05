import { ResolveFn } from '@angular/router';
import { TourService } from '../tour.service';
import { inject } from '@angular/core';
import { TourDetail } from 'src/app/shared/models/TourDetail';

// resolve trong route được sử dụng để lấy dữ liệu trước khi route được kích hoạt. Điều này đảm bảo rằng dữ liệu cần thiết đã được tải trước khi component được hiển thị.
export const tourDetailResolver: ResolveFn<TourDetail> = (route, state) => {
  const tourSerivce = inject(TourService);
  // console.log(
  //   route.paramMap.get('title')!,
  //   route.paramMap.get('tourCode')!,
  //   route.queryParamMap.get('date')!
  // );
  return tourSerivce.getTour(
    route.paramMap.get('title')!,
    route.paramMap.get('tourCode')!,
    route.queryParamMap.get('date')!
  );
  // var title = route.paramMap.get('title');
  // if (title) return tourSerivce.getTour(title);
  // else {
  //   {
  //     throw new Error('Title not found in route');
  //   }
  // }
};
