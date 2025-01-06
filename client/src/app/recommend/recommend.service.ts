import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourTypeHobby } from '../shared/models/TourTypeHobby';
import { environment } from 'src/environments/environment';
import { TourToRecommend } from '../shared/models/TourToRecommend';
import { Pagination } from '../shared/models/Pagination';
import { BookingRecommendation } from '../shared/models/BookingRecommendation';

@Injectable({
  providedIn: 'root',
})
export class RecommendService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllTourTypeHobby() {
    return this.http.get<TourTypeHobby>(this.baseUrl + 'tours/tour-type-hobby');
  }

  getAllTourToRecommend() {
    // Get All tour for recommendation
    return this.http.get<Pagination<TourToRecommend[]>>(
      this.baseUrl + 'tours/recommend-tour'
    );
  }

  getAllBookingForUser(userId: number) {
    return this.http.get<BookingRecommendation[]>(
      this.baseUrl +
        'bookings/all-booking-for-recommendation' +
        '?uid=' +
        userId
    );
  }
}
