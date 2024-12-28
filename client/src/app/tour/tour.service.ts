import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tour } from '../shared/models/Tour';
import { TourDetail } from '../shared/models/TourDetail';
import { StringUtility } from '../shared/models/StringUtility';
import { Departure } from '../shared/models/Departure';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  baseUrl = environment.apiUrl;

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
}
