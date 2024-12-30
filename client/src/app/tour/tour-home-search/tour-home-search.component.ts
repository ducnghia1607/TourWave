import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLocation, faFlag, faG } from '@fortawesome/free-solid-svg-icons';
import { TourService } from '../tour.service';
import { Tour } from 'src/app/shared/models/Tour';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Departure } from 'src/app/shared/models/Departure';
import { NavigationExtras, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tour-home-search',
  templateUrl: './tour-home-search.component.html',
  styleUrls: ['./tour-home-search.component.css'],
})
export class TourHomeSearchComponent implements OnInit {
  searchTourResult: Tour[] = [];
  selectedTourCode: string = '';
  inputSubject: Subject<string> = new Subject<string>();
  departures: Departure[] = [];
  selectedDeparture: string = '';
  selectedDate: string = '';
  constructor(
    private tourService: TourService,
    private router: Router,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.inputSubject
      .pipe(
        debounceTime(300), // Adjust the delay as needed (300ms in this example)
        distinctUntilChanged(),
        switchMap((searchTerm) => this.tourService.getSearchResult(searchTerm))
      )
      .subscribe({
        next: (res) => {
          this.searchTourResult = res;
          this.showResultSearch = true;
        },
        error: (err) => console.log(err),
      });

    this.tourService.getAllDepartures().subscribe({
      next: (res) => {
        // console.log(res);
        this.departures = res;
        this.selectedDeparture = this.departures[0].name;
      },
      error: (err) => console.log(err),
    });
  }

  animalControl = new FormControl<Location | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  faLocation = faLocation as IconProp;
  faFlag = faFlag as IconProp;
  showMenuLocation: boolean = false;
  showResultSearch: boolean = false;
  minDate: Date = new Date();
  searchKeyword: string = '';
  clickInput($event: any) {
    if ($event.target.value != '') {
      this.showMenuLocation = false;
    } else {
      this.showMenuLocation = true;
    }
  }
  locationMenuClick(location: string) {
    this.searchKeyword = location;
    this.showMenuLocation = false;
  }
  searchTour($event: any) {
    this.showMenuLocation = false;
    if (this.searchKeyword == '') {
      this.searchTourResult = [];
      this.showMenuLocation = true;
      return;
    }
    const inputValue = $event.target.value;
    this.inputSubject.next(inputValue);
  }

  selecteTour(tourTitle: string, tourCode: string) {
    this.searchKeyword = tourTitle;
    this.selectedTourCode = tourCode;
    this.showResultSearch = false;
    this.showMenuLocation = false;
  }

  searchButtonClicked() {
    if (this.searchKeyword != '') {
      if (this.selectedTourCode != '') {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            date:
              this.selectedDate ||
              this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
          },
        };
        this.router.navigate(
          ['/tours', this.searchKeyword, this.selectedTourCode],
          navigationExtras
        );
      } else {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            date:
              this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') ||
              this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
            departure: this.selectedDeparture,
            search: this.searchKeyword,
          },
        };
        this.router.navigate(['/tours', this.searchKeyword], navigationExtras);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const inputElement = document.querySelector('.search-input');
    const menuWrapper = document.querySelector('.location-menu-wrapper');
    const searchResultWrapper = document.querySelector(
      '.search-result-wrapper'
    );

    if (
      inputElement &&
      menuWrapper &&
      !inputElement.contains(target) &&
      !menuWrapper.contains(target)
    ) {
      this.showMenuLocation = false;
      // this.showResultSearch = false;
    }

    if (
      inputElement &&
      searchResultWrapper &&
      !inputElement.contains(target) &&
      !searchResultWrapper.contains(target)
    ) {
      this.showResultSearch = false;
    }
  }
}
