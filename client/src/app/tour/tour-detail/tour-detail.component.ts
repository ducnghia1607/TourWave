import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  NgModule,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { TourService } from '../tour.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TourDetail } from 'src/app/shared/models/TourDetail';
// import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import {
  faCar,
  faPlane,
  faTrain,
  faCheck,
  faPlus,
  faMinus,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TourDetailNoticeComponent } from '../tour-detail-notice/tour-detail-notice.component';
import { MatAccordion } from '@angular/material/expansion';
import { TourDetailScheduleComponent } from '../tour-detail-schedule/tour-detail-schedule.component';
import {
  MatCalendarCellClassFunction,
  MatDatepickerInput,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { NgModel } from '@angular/forms';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { TourDetailNavbarComponent } from '../tour-detail-navbar/tour-detail-navbar.component';
import { Schedule } from 'src/app/shared/models/Schedule';
import { StringUtility } from 'src/app/shared/models/StringUtility';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    GalleryModule,
    SharedModule,
    FontAwesomeModule,
    TourDetailNoticeComponent,
    TourDetailScheduleComponent,
    TourDetailNavbarComponent,
  ],
})
export class TourDetailComponent implements OnInit, AfterViewInit {
  faPlane = faPlane as IconProp;
  faTrain = faTrain as IconProp;
  faCar = faCar as IconProp;
  faCheck = faCheck as IconProp;
  faPlus = faPlus as IconProp;
  faMinus = faMinus as IconProp;
  faInfo = faInfo as IconProp;
  baseUrl = environment.apiUrl;
  tourDetail!: TourDetail;
  images: GalleryItem[] = [];
  panelOpenState = false;
  firstBoxWhiteDate!: Date | null;
  secondBoxWhiteDate!: Date | null;
  thirdBoxWhiteDate!: Date | null;
  schedulesList: Date[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  selectedDate!: Date;
  adultNumber: number = 1;
  childNumber: number = 0;
  selectedDateParam!: Date;
  datepipe: DatePipe = new DatePipe('en-US');
  @ViewChild(TourDetailNavbarComponent, { static: false })
  tourNavbar!: TourDetailNavbarComponent;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild('toursidebar', { static: false }) toursidebar!: ElementRef;
  constructor(
    private tourService: TourService,
    @Inject(ActivatedRoute) private activedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    var extras = this.router.getCurrentNavigation()?.extras;
    if (extras) {
      var queryParams = extras.queryParams;
      if (queryParams) {
        this.selectedDateParam = new Date(queryParams['date']);
      }
    }
  }

  ngAfterViewInit(): void {}
  ngOnInit(): void {
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    this.activedRoute.data.subscribe({
      next: (data) => {
        this.tourDetail = data['tourDetail'];
        const newUrl = `/tours/${StringUtility.removeSign4VietnameseString(
          this.tourDetail.title
        )}/${this.tourDetail.tourCode}`;
        this.location.replaceState(newUrl);
        this.tourDetail.images.forEach((element) => {
          this.images.push(
            new ImageItem({ src: element.url, thumb: 'IMAGE_THUMBNAIL_URL' })
          );
        });
        var schedules = this.tourDetail.schedules;
        if (schedules?.length && schedules.at(0)?.departureDate) {
          const minDate = schedules.at(0)?.departureDate;
          const maxDate = schedules.at(-1)?.departureDate;
          if (minDate) {
            this.minDate = new Date(minDate);
            this.selectedDate = this.minDate;
          }
          if (maxDate) {
            this.maxDate = new Date(maxDate);
          }
          schedules.forEach((item) => {
            if (item) {
              this.schedulesList.push(new Date(item.departureDate));
            }
          });
          if (this.schedulesList.length != 0)
            this.firstBoxWhiteDate = this.schedulesList[0];

          if (this.schedulesList.length > 1)
            this.secondBoxWhiteDate = this.schedulesList[1];

          if (this.schedulesList.length > 2)
            this.thirdBoxWhiteDate = this.schedulesList[2];

          if (this.selectedDateParam) {
            var idx = this.schedulesList.findIndex(
              (x) => x.toDateString() == this.selectedDateParam.toDateString()
            );
            if (idx != -1) {
              this.selectedDate = this.selectedDateParam;
            }
            this.setBoxWhiteContent(this.selectedDateParam);
          }
        }
      },
    });
  }
  GetTourById() {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.tourService.getTourById(id).subscribe({
        next: (res) => {
          this.tourDetail = res;
          this.tourDetail.images.forEach((element) => {
            this.images.push(
              new ImageItem({ src: element.url, thumb: 'IMAGE_THUMBNAIL_URL' })
            );
          });
          console.log(res);
          var schedules = this.tourDetail.schedules;
          if (schedules?.length && schedules.at(0)?.departureDate) {
            const minDate = schedules.at(0)?.departureDate;
            const maxDate = schedules.at(-1)?.departureDate;
            if (minDate) {
              this.minDate = new Date(minDate);
              this.selectedDate = this.minDate;
            }
            if (maxDate) {
              this.maxDate = new Date(maxDate);
            }
            schedules.forEach((item) => {
              if (item) {
                this.schedulesList.push(new Date(item.departureDate));
              }
            });
            if (this.schedulesList.length != 0)
              this.firstBoxWhiteDate = this.schedulesList[0];

            if (this.schedulesList.length > 1)
              this.secondBoxWhiteDate = this.schedulesList[1];

            if (this.schedulesList.length > 2)
              this.thirdBoxWhiteDate = this.schedulesList[2];
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  @HostListener('document:scroll') scrollover() {
    const navbarElement = document.getElementById('main-header');
    if (
      (document?.scrollingElement?.scrollTop != null &&
        document?.scrollingElement?.scrollTop > 0) ||
      document.documentElement.scrollTop > 0
    ) {
      var scrollTopValue = document?.scrollingElement?.scrollTop;

      if (scrollTopValue) {
        if (scrollTopValue > 400) {
          navbarElement?.classList.add('hidden');
          this.tourNavbar.isHidden = false;
          this.tourNavbar.isTabNameActive = 'overview';
          if (this.toursidebar) {
            this.toursidebar.nativeElement.classList.add('affix');
          }
        }
        if (scrollTopValue >= 2128) this.tourNavbar.isTabNameActive = 'notice';
        else if (scrollTopValue >= 1750)
          this.tourNavbar.isTabNameActive = 'schedule';
        else if (scrollTopValue >= 1240)
          this.tourNavbar.isTabNameActive = 'itinerary';
        else if (scrollTopValue >= 715)
          this.tourNavbar.isTabNameActive = 'overview';
      }
    } else {
      this.tourNavbar.isHidden = true;
      navbarElement?.classList.remove('hidden');
      if (this.toursidebar) {
        this.toursidebar.nativeElement.classList.remove('affix');
      }
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = new Date(cellDate.getTime()).toDateString();
      var item = this.tourDetail.schedules.findIndex((item, i) => {
        var dt = new Date(item.departureDate).toDateString();
        return date == dt;
      });
      return item != -1 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  toggleAccordion(panelState: boolean) {
    if (this.panelOpenState == false) {
      this.accordion.openAll();
    } else {
      this.accordion.closeAll();
    }
    this.panelOpenState = !panelState;
  }

  dateChangeSidebar(event: MatDatepickerInputEvent<Date>) {
    if (event.value) this.setBoxWhiteContent(event.value);
  }

  setBoxWhiteContent(value: Date) {
    var idx = this.schedulesList.findIndex(
      (x) => x.toDateString() == value.toDateString()
    );
    var length = this.schedulesList.length;
    if (idx == -1) {
      if (length >= 1) {
        this.selectedDate = this.schedulesList[length - 1];
      }
      if (length >= 3) {
        this.firstBoxWhiteDate = this.schedulesList[length - 3];

        this.secondBoxWhiteDate = this.schedulesList[length - 2];

        this.thirdBoxWhiteDate = this.schedulesList[length - 1];
      } else if (length == 2) {
        this.firstBoxWhiteDate = this.schedulesList[length - 2];

        this.secondBoxWhiteDate = this.schedulesList[length - 1];

        this.thirdBoxWhiteDate = null;
      } else if (length == 1) {
        this.firstBoxWhiteDate = this.schedulesList[0];

        this.secondBoxWhiteDate = null;

        this.thirdBoxWhiteDate = null;
      }
    } else if (idx == 0) {
      this.firstBoxWhiteDate = this.schedulesList[0];
      if (this.schedulesList.length >= 2)
        this.secondBoxWhiteDate = this.schedulesList[1];
      else {
        this.secondBoxWhiteDate = null;
      }
      if (this.schedulesList.length >= 3)
        this.thirdBoxWhiteDate = this.schedulesList[2];
      else this.thirdBoxWhiteDate = null;
    } else if (idx == this.schedulesList.length - 1) {
      if (this.schedulesList.length >= 3) {
        this.firstBoxWhiteDate = this.schedulesList[idx - 2];

        this.secondBoxWhiteDate = this.schedulesList[idx - 1];

        this.thirdBoxWhiteDate = this.schedulesList[idx];
      } else {
        this.firstBoxWhiteDate = this.schedulesList[idx - 1];
        this.secondBoxWhiteDate = this.schedulesList[idx];
        this.thirdBoxWhiteDate = null;
      }
    } else {
      this.firstBoxWhiteDate = this.schedulesList[idx - 1];
      this.secondBoxWhiteDate = this.schedulesList[idx];
      this.thirdBoxWhiteDate = this.schedulesList[idx + 1];
    }
  }
  selectedRowChangeSchedulesHandle(selectedDateSchedule: Schedule) {
    if (selectedDateSchedule) {
      this.selectedDate = new Date(selectedDateSchedule.departureDate);
      this.setBoxWhiteContent(new Date(selectedDateSchedule.departureDate));
    }
  }

  onBoxWhiteClick(id: number) {
    if (id == 1) {
      if (this.firstBoxWhiteDate) this.selectedDate = this.firstBoxWhiteDate;
    } else if (id == 2) {
      if (this.secondBoxWhiteDate) this.selectedDate = this.secondBoxWhiteDate;
    } else {
      if (this.thirdBoxWhiteDate) this.selectedDate = this.thirdBoxWhiteDate;
    }
  }

  increment(typePerson: string) {
    if (typePerson == 'adult') {
      this.adultNumber++;
    } else {
      this.childNumber++;
    }
  }

  decrement(typePerson: string) {
    if (typePerson == 'adult') {
      if (this.adultNumber == 0) return;
      this.adultNumber--;
    } else {
      if (this.childNumber == 0) return;
      this.childNumber--;
    }
  }
  get totalPrice() {
    return (
      this.adultNumber * this.tourDetail.priceAdult +
      this.childNumber * this.tourDetail.priceChild
    );
  }
}
