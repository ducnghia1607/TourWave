import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tour } from '../shared/models/Tour';
import { TourDetail } from '../shared/models/TourDetail';
import { Departure } from '../shared/models/Departure';
import { TourParams } from '../shared/models/TourParams';
import { Pagination } from '../shared/models/Pagination';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Schedule } from '../shared/models/Schedule';
import { Consulting } from '../shared/models/Consulting';
import { SortDirection } from '@angular/material/sort';
import { BookingResponse } from '../shared/models/BookingResponse';
import { TourType } from '../shared/models/TourType';
import { ReviewResponse } from '../shared/models/ReviewResponse';
import { Review } from '../shared/models/Review';
@Injectable({
  providedIn: 'root',
})
export class TourService {
  baseUrl = environment.apiUrl;
  tourParams: TourParams = new TourParams();
  tourPagination?: Pagination<Tour[]>;
  recentVistedTours = new BehaviorSubject<Tour[] | null>(null);
  recentVistedToursSource$ = this.recentVistedTours.asObservable();
  constructor(private http: HttpClient) {
    this.getHotTours();
  }

  getHotTours() {
    return this.http.get<Tour[]>(this.baseUrl + 'tours/best-tour');
  }
  getHotInternationalTours() {
    return this.http.get<Tour[]>(this.baseUrl + 'tours/hot-international-tour');
  }
  getHotDomesticTours() {
    return this.http.get<Tour[]>(this.baseUrl + 'tours/hot-domestic-tour');
  }
  getTourById(id: string) {
    return this.http.get<TourDetail>(this.baseUrl + 'tours/' + id);
  }

  getTour(title: string, tourCode: string, date: string) {
    return this.http.get<TourDetail>(
      this.baseUrl + 'tours/' + title + '/' + tourCode + '?date=' + date
    );
  }

  getSearchResult(searchTerm: string) {
    return this.http.get<Tour[]>(
      this.baseUrl + 'tours/search-temp?keyword=' + searchTerm
    );
  }

  getAllDepartures() {
    return this.http.get<Departure[]>(this.baseUrl + 'departures');
  }

  getListTourBySearch(): Observable<Pagination<Tour[]>> {
    var params = new HttpParams();
    if (this.tourParams.search)
      params = params.append('search', this.tourParams.search);
    if (this.tourParams.departure)
      params = params.append('departure', this.tourParams.departure);
    if (this.tourParams.date)
      params = params.append('date', this.tourParams.date);
    if (this.tourParams.sort)
      params = params.append('sort', this.tourParams.sort);
    if (this.tourParams.filterByPrice) {
      params = params.append('filterByPrice', this.tourParams.filterByPrice);
    }
    params = params.append('pageIndex', this.tourParams.pageIndex);
    params = params.append('pageSize', this.tourParams.pageSize);
    return this.http
      .get<Pagination<Tour[]>>(
        this.baseUrl + 'tours/' + this.tourParams.search,
        {
          params: params,
        }
      )
      .pipe(
        map((res) => {
          if (res) this.tourPagination = res;
          return res;
        })
      );
  }

  getListOfBookingForUser(
    sort: string,
    order: SortDirection,
    page: number,
    userId: number
  ) {
    var queryStringValue = `?sort=${sort}&order=${order}&page=${page + 1}`;
    // if (selectedDate) queryStringValue += `&date=${selectedDate}`;
    // else queryStringValue += `&date=`;
    // if (filterValue) queryStringValue += `&search=${filterValue}`;
    // else queryStringValue += `&search=`;
    // if (selectedDd) queryStringValue += `&departureDate=${selectedDd}`;
    // else queryStringValue += `&departureDate=`;
    if (userId) queryStringValue += `&uid=${userId}`;
    else queryStringValue += `&uid=`;
    return this.http.get<Pagination<BookingResponse[]>>(
      this.baseUrl + 'bookings/booking-for-user' + queryStringValue
    );
  }

  getTourParams() {
    return this.tourParams;
  }
  setTourParams(params: TourParams) {
    this.tourParams = params;
  }

  getSchedulesWithFilter(date: string, tourId: number) {
    return this.http.get<Schedule[]>(
      this.baseUrl + 'schedules?date=' + date + '&tourId=' + tourId
    );
  }

  getRelatedTours(destination: string, tourCode: string) {
    return this.http.get<Tour[]>(
      this.baseUrl +
        'tours/related-tour' +
        '?destination=' +
        destination +
        '&tourCode=' +
        tourCode
    );
  }

  createNewConsulting(consulting: Consulting) {
    return this.http.post<Consulting>(this.baseUrl + 'consulting', consulting);
  }
  getAllConsultings() {
    return this.http.get<Consulting[]>(this.baseUrl + 'consulting');
  }
  getAllTourTypes() {
    return this.http.get<TourType[]>(this.baseUrl + 'tours/tour-types');
  }

  createNewTour(tour: any) {
    return this.http.post<any>(this.baseUrl + 'tours', tour);
  }
  deleteTour(tourId: any) {
    return this.http.delete(this.baseUrl + 'tours/' + tourId);
  }

  getAllReviews(tourId: number) {
    return this.http.get<ReviewResponse[]>(
      this.baseUrl + 'reviews?tourId=' + tourId
    );
  }

  createNewReview(review: Review) {
    return this.http.post<Review>(this.baseUrl + 'reviews', review);
  }

  checkCanReview(tourId: number, uid: number) {
    return this.http.get<boolean>(
      this.baseUrl + 'tours/check-can-review?tourId=' + tourId + '&uid=' + uid
    );
  }
}
