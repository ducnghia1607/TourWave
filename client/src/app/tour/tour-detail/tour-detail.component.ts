import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TourService } from '../tour.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { TourDetailNavbarComponent } from '../tour-detail-navbar/tour-detail-navbar.component';
import { Schedule } from 'src/app/shared/models/Schedule';
import { StringUtility } from 'src/app/shared/models/StringUtility';
import { BreadcrumbService } from 'xng-breadcrumb';
import { TourConsultingDialogComponent } from '../tour-consulting-dialog/tour-consulting-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Consulting } from 'src/app/shared/models/Consulting';
import { take, tap } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/models/User';
import { Tour } from 'src/app/shared/models/Tour';
import { TourRelatedItemComponent } from '../tour-related-item/tour-related-item.component';
import { BookingService } from 'src/app/core/services/booking.service';
import { Booking } from 'src/app/shared/models/Booking';
import { TourDetailReviewComponent } from '../tour-detail-review/tour-detail-review.component';
import { ReviewResponse } from 'src/app/shared/models/ReviewResponse';
import { TourType } from 'src/app/shared/models/TourType';

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
    TourRelatedItemComponent,
    TourDetailReviewComponent,
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
  relatedTours: Tour[] = [];
  recentVistedTours: Tour[] = [];
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
  showBlackBackGround = false;
  consulting!: Consulting;
  booking!: Booking;
  tourTypes: TourType[] = [];
  tourTypeStr: string = '';
  @ViewChild(TourDetailNavbarComponent, { static: false })
  tourNavbar!: TourDetailNavbarComponent;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  user!: User;
  @ViewChild('toursidebar', { static: false }) toursidebar!: ElementRef;
  constructor(
    private tourService: TourService,
    @Inject(ActivatedRoute) private activedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    public dialog: MatDialog,
    private accountService: AccountService,
    private bookingService: BookingService
  ) {
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    var extras = this.router.getCurrentNavigation()?.extras;
    if (extras) {
      var queryParams = extras.queryParams;
      if (queryParams) {
        this.selectedDateParam = new Date(queryParams['date']);
      }
    }

    this.accountService.currentUser$.pipe(take(1)).subscribe((res) => {
      if (res) {
        this.user = res;
        console.log(this.user);
      }
    });

    this.bookingService.currentBooking$.subscribe((res) => {
      if (res) {
        this.booking = res;
      }
    });
    this.recentVistedTours = JSON.parse(
      localStorage.getItem('recentVisitedTours') || '[]'
    ).slice(0, 3);
    this.tourService.getAllTourTypes().subscribe((res) => {
      this.tourTypes = res;
      if (
        this.tourTypes.length > 0 &&
        this.tourDetail.tourWithType.length > 0
      ) {
        this.tourDetail.tourWithType.forEach((element) => {
          var tourType = this.tourTypes.find((x) => x.id == element.tourTypeId);
          if (tourType) {
            this.tourTypeStr += tourType.name + ', ';
          }
        });
        this.tourTypeStr = this.tourTypeStr.slice(0, -2);
      }
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(TourConsultingDialogComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.consultingRequest.subscribe(
      (consultingData) => {
        this.consulting = consultingData;
        this.consulting.tourId = this.tourDetail.id;
        this.consulting.appUserId = this.user ? this.user.id : 0;
        this.consulting.status = '0';
        this.tourService.createNewConsulting(this.consulting).subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err),
        });
      }
    );
  }
  reviews: ReviewResponse[] = [];

  getAllReview(tourId: number) {
    this.tourService.getAllReviews(tourId).subscribe((res) => {
      this.reviews = res;
    });
  }
  canReview = false;
  checkCanReview(tourId: number, uid: number) {
    this.tourService
      .checkCanReview(tourId, uid)
      .pipe(take(1))
      .subscribe((res) => {
        this.canReview = res;
      });
  }
  bookingTour() {
    if (!this.user) {
      this.router.navigate(['auth/login'], {
        queryParams: {
          returnUrl: this.router.url,
        },
      });
      return;
    }
    var schedule = this.tourDetail.schedules.find((x) => {
      console.log(
        new Date(x.departureDate).getTime(),
        this.selectedDate.getTime()
      );
      return new Date(x.departureDate).getTime() == this.selectedDate.getTime();
    });
    if (!schedule) return;
    var booking = {
      tourId: this.tourDetail.id,
      appUserId: this.user.id,
      departureDate: schedule?.departureDate,
      returnDate: schedule?.returnDate,
      numAdults: this.adultNumber,
      numChildren: this.childNumber,
      pricePerAdult: this.tourDetail.priceAdult,
      pricePerChild: this.tourDetail.priceChild,
      scheduleId: schedule?.id,
      paymentStatus: '0',
      status: '0',
      paymentMethodType: '',
      createDate: new Date(),
    } as Booking;
    // this.bookingService.addNewBooking(booking).subscribe();
    const navigationExtras: NavigationExtras = {
      state: { booking: booking },
      queryParams: {
        id: this.tourDetail.id,
      },
    };
    this.router.navigate(['/checkout'], navigationExtras);
  }

  ngAfterViewInit(): void {}
  ngOnInit(): void {
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    this.activedRoute.data.subscribe({
      next: (data) => {
        this.tourDetail = data['tourDetail'];
        this.tourDetail.schedules = this.tourDetail.schedules.sort(
          (a, b) =>
            new Date(a.departureDate).getTime() -
            new Date(b.departureDate).getTime()
        );
        this.getAllReview(this.tourDetail.id);
        if (this.user && this.user.id)
          this.checkCanReview(this.tourDetail.id, this.user.id);
        console.log(this.reviews);
        this.breadcrumbService.set('@tourTitle', this.tourDetail.title);

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
              this.setBoxWhiteContent(this.selectedDateParam);
            }
          }
        }

        this.GetRelatedTours();
      },
    });
  }

  GetRelatedTours() {
    this.tourService
      .getRelatedTours(this.tourDetail.destination, this.tourDetail.tourCode)
      .subscribe((res) => {
        if (res) this.relatedTours = res;
      });
  }

  @HostListener('document:scroll') scrollover() {
    const navbarElement = document.getElementById('main-header');
    if (
      (document?.scrollingElement?.scrollTop != null &&
        document?.scrollingElement?.scrollTop > 0) ||
      document.documentElement.scrollTop > 0
    ) {
      var scrollTopValue = document?.scrollingElement?.scrollTop;
      // console.log(scrollTopValue);
      if (scrollTopValue) {
        if (scrollTopValue > 400) {
          navbarElement?.classList.add('hidden');
          this.tourNavbar.isHidden = false;
          // this.tourNavbar.isTabNameActive = 'overview';
          if (this.toursidebar) {
            this.toursidebar.nativeElement.classList.add('affix');
          }
        }
        if (scrollTopValue >= 2400) {
          if (this.toursidebar) {
            this.toursidebar.nativeElement.classList.remove('affix');
          }
        } else if (scrollTopValue >= 2070)
          this.tourNavbar.isTabNameActive = 'notice';
        else if (scrollTopValue >= 1690)
          this.tourNavbar.isTabNameActive = 'schedule';
        else if (scrollTopValue >= 1000)
          this.tourNavbar.isTabNameActive = 'itinerary';
        else if (scrollTopValue >= 600)
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
    this.showBlackBackGround = true;
    if (selectedDateSchedule) {
      this.selectedDate = new Date(selectedDateSchedule.departureDate);
      this.setBoxWhiteContent(new Date(selectedDateSchedule.departureDate));
    }
  }

  departureDateChangeHandle(date: Date) {
    console.log(date);
    if (date != null) {
      var dateStr = this.datepipe.transform(date, 'yyyy-MM-dd');
      if (dateStr)
        this.tourService
          .getSchedulesWithFilter(dateStr, this.tourDetail.id)
          .subscribe((res) => {
            this.tourDetail.schedules = res;
          });
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
