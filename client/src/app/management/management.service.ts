import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consulting } from '../shared/models/Consulting';
import { environment } from 'src/environments/environment';
import { ConsultingResponse } from '../shared/models/ConsultingResponse';
import { SortDirection } from '@angular/material/sort';
import { Pagination } from '../shared/models/Pagination';
import { BookingResponse } from '../shared/models/BookingResponse';
import { Observable } from 'rxjs';
import { Tour } from '../shared/models/Tour';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  getRepoIssues(active: string, direction: string, pageIndex: number) {
    throw new Error('Method not implemented.');
  }
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getListOfConsulting(
    sort: string,
    order: SortDirection,
    page: number,
    selectedDate: string,
    filterValue: string
  ) {
    var queryStringValue = `?sort=${sort}&order=${order}&page=${page + 1}`;
    if (selectedDate) queryStringValue += `&date=${selectedDate}`;
    else queryStringValue += `&date=`;
    if (filterValue) queryStringValue += `&search=${filterValue}`;
    else queryStringValue += `&search=`;
    return this.http.get<Pagination<ConsultingResponse[]>>(
      this.baseUrl + 'consulting' + queryStringValue
    );
  }

  updateStatusConsulting(id: number) {
    return this.http.put<ConsultingResponse>(
      this.baseUrl + 'consulting/' + id,
      {}
    );
  }

  deleteConsulting(id: number) {
    return this.http.delete(this.baseUrl + 'consulting/' + id);
  }

  getConsulting(id: number) {
    return this.http.get<ConsultingResponse>(this.baseUrl + 'consulting/' + id);
  }

  getListOfBooking(
    sort: string,
    order: SortDirection,
    page: number,
    selectedDate: string,
    filterValue: string,
    selectedDd: string
  ) {
    var queryStringValue = `?sort=${sort}&order=${order}&page=${page + 1}`;
    if (selectedDate) queryStringValue += `&date=${selectedDate}`;
    else queryStringValue += `&date=`;
    if (filterValue) queryStringValue += `&search=${filterValue}`;
    else queryStringValue += `&search=`;
    if (selectedDd) queryStringValue += `&departureDate=${selectedDd}`;
    else queryStringValue += `&departureDate=`;
    return this.http.get<Pagination<BookingResponse[]>>(
      this.baseUrl + 'bookings' + queryStringValue
    );
  }

  getBooking(id: number) {
    return this.http.get<BookingResponse>(this.baseUrl + 'bookings/' + id);
  }

  getListOfTours(
    sortBy: string,
    order: SortDirection,
    page: number,
    filterValue: string
  ): Observable<Pagination<Tour[]>> {
    var params = new HttpParams();

    if (filterValue) params = params.append('search', filterValue);
    if (sortBy) params = params.append('sortBy', sortBy);
    if (order) params = params.append('sort', order);

    params = params.append('pageIndex', page);
    params = params.append('pageSize', 10);
    return this.http.get<Pagination<Tour[]>>(
      this.baseUrl + 'tours/tour-management',
      {
        params: params,
      }
    );
  }
}
