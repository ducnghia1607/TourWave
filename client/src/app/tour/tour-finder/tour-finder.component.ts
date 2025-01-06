import { Component, OnInit } from '@angular/core';
import { TourParams } from 'src/app/shared/models/TourParams';
import { TourService } from '../tour.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Pagination } from 'src/app/shared/models/Pagination';
import { Tour } from 'src/app/shared/models/Tour';
import { DatePipe } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-tour-finder',
  templateUrl: './tour-finder.component.html',
  styleUrls: ['./tour-finder.component.css'],
})
export class TourFinderComponent implements OnInit {
  tourParams: TourParams = new TourParams();
  keywordInput: string = '';
  departureInput: string = '';
  dateInput: string = '';
  options = [
    {
      name: 'Giá thấp đến cao',
      value: 'priceAsc',
    },
    {
      name: 'Giá cao đến thấp',
      value: 'priceDesc',
    },
  ];
  tourPagination!: Pagination<Tour[]>;
  constructor(
    private tourService: TourService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private breadcrumbService: BreadcrumbService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.departureInput = params['departure']; // diem xuat phat
      this.dateInput = params['date']; // thoi gian khoi thanh
      this.keywordInput = params['search']; // search
      this.breadcrumbService.set('@locationName', params['search']);

      this.tourParams.search = this.keywordInput; // search
      this.tourParams.departure = this.departureInput;
      this.tourParams.date = this.dateInput;
      this.tourService.setTourParams(this.tourParams);
      this.getListOfTours();
    });

    // var queryParams = this.router.getCurrentNavigation()?.extras.queryParams;
    // if (queryParams) {
    //   this.departureInput = queryParams['departure'];
    //   this.dateInput = queryParams['date'];
    // }
  }
  ngOnInit(): void {
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }

  getListOfTours() {
    return this.tourService.getListTourBySearch().subscribe({
      next: (res) => {
        this.tourPagination = res;
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  clickTourSidebarHandle($event: any) {
    var link = $event;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        date:
          this.datePipe.transform(this.dateInput, 'yyyy-MM-dd') ||
          this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
        departure: this.departureInput,
        search: link,
      },
    };
    this.router.navigate(['/tours', link], navigationExtras);
  }

  changePageNumberHandle($event: any) {
    this.tourParams.pageIndex = $event;
    this.tourParams.pageSize = 6;
    //  comment dong nay de hien thi tat ca tour
    this.tourService.setTourParams(this.tourParams);
    console.log(this.tourService.getTourParams());
    this.getListOfTours();
  }

  sortTourClickHandle($event: any) {
    this.tourParams.sort = $event;
    this.tourService.setTourParams(this.tourParams);
    this.getListOfTours();
  }
  filterTourClickHandle($event: any) {
    this.tourParams.filterByPrice = $event;
    this.tourService.setTourParams(this.tourParams);
    this.getListOfTours();
  }
}
