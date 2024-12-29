import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tour } from '../shared/models/Tour';
import { TourDetail } from '../shared/models/TourDetail';
import { Departure } from '../shared/models/Departure';
import { TourParams } from '../shared/models/TourParams';
import { Pagination } from '../shared/models/Pagination';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TourService {
  baseUrl = environment.apiUrl;
  tourParams: TourParams = new TourParams();
  tourPagination?: Pagination<Tour[]>;

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

  getTour(title: string, tourCode: string) {
    return this.http.get<TourDetail>(
      this.baseUrl + 'tours/' + title + '/' + tourCode
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

  getTourParams() {
    return this.tourParams;
  }
  setTourParams(params: TourParams) {
    this.tourParams = params;
  }
}
