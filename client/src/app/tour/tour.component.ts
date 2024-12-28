import { Component } from '@angular/core';
import { TourService } from './tour.service';
import { Tour } from '../shared/models/Tour';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent {
  bestTours: Tour[] = [];
  hotDomesticTours: Tour[] = [];
  hotInternationalTours: Tour[] = [];
  constructor(private tourService: TourService) {
    this.getBestTours();
    this.getHotDomesticTours();
    this.getHotInternationalTours();
  }
  getBestTours() {
    this.tourService.getHotTours().subscribe({
      next: (res) => {
        this.bestTours = res;
      },
      error: (error) => console.log(error),
    });
  }

  getHotDomesticTours() {
    this.tourService.getHotDomesticTours().subscribe({
      next: (res) => {
        this.hotDomesticTours = res;
      },
      error: (error) => console.log(error),
    });
  }
  getHotInternationalTours() {
    this.tourService.getHotInternationalTours().subscribe({
      next: (res) => {
        this.hotInternationalTours = res;
      },
      error: (error) => console.log(error),
    });
  }
}
