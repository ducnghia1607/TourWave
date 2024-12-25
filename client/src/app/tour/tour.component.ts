import { Component } from '@angular/core';
import { TourService } from './tour.service';
import { Tour } from '../shared/models/Tour';
import { FormControl, Validators } from '@angular/forms';
interface Food {
  value: string;
  viewValue: string;
}
interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];

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
