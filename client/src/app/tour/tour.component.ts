import { Component, ViewChild } from '@angular/core';
import { TourService } from './tour.service';
import { Tour } from '../shared/models/Tour';
import { FormControl, Validators } from '@angular/forms';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NavigationExtras, Router } from '@angular/router';
import { TourHomeSearchComponent } from './tour-home-search/tour-home-search.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent {
  faHome = faHome as IconProp;
  bestTours: Tour[] = [];
  hotDomesticTours: Tour[] = [];
  hotInternationalTours: Tour[] = [];
  recentVisitedTours: Tour[] = [];
  @ViewChild(TourHomeSearchComponent)
  tourHomeSearchComponent!: TourHomeSearchComponent;
  constructor(
    private tourService: TourService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.getBestTours();
    // this.getHotDomesticTours();
    // this.getHotInternationalTours();
    this.recentVisitedTours = JSON.parse(
      localStorage.getItem('recentVisitedTours') || '[]'
    );
  }
  getBestTours() {
    this.tourService.getHotTours().subscribe({
      next: (res) => {
        this.bestTours = res;
      },
      error: (error) => console.log(error),
    });
  }

  removeRecentTourHandle($event: any) {
    this.recentVisitedTours = this.recentVisitedTours.filter(
      (x: any) => x.id != $event
    );
    localStorage.setItem(
      'recentVisitedTours',
      JSON.stringify(this.recentVisitedTours)
    );
  }

  // getHotDomesticTours() {
  //   this.tourService.getHotDomesticTours().subscribe({
  //     next: (res) => {
  //       this.hotDomesticTours = res;
  //     },
  //     error: (error) => console.log(error),
  //   });
  // }
  // getHotInternationalTours() {
  //   this.tourService.getHotInternationalTours().subscribe({
  //     next: (res) => {
  //       this.hotInternationalTours = res;
  //     },
  //     error: (error) => console.log(error),
  //   });
  // }

  navigateToTourFinder(link: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        date:
          this.datePipe.transform(this.tourHomeSearchComponent.searchKeyword) ||
          this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
        departure: this.tourHomeSearchComponent.selectedDeparture,
        search: link,
      },
    };
    if (link) {
      this.router.navigate(['/tours/tour-finder', link], navigationExtras);
    }
  }
}
