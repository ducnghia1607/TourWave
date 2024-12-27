import {
  Component,
  Inject,
  NgModule,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TourService } from '../tour.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TourDetail } from 'src/app/shared/models/TourDetail';
// import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { CommonModule } from '@angular/common';
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
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

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
  ],
})
export class TourDetailComponent implements OnInit {
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
  selected!: Date | null;
  firstBoxWhite!: string;
  secondBoxWhite!: string;
  thirdBoxWhite!: string;
  minDate!: Date;
  maxDate!: Date;
  totalPrice!: number;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
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
  constructor(
    private tourService: TourService,
    @Inject(ActivatedRoute) private activedRoute: ActivatedRoute
  ) {
    this.GetTourById();
  }
  ngOnInit(): void {}
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
          if (
            this.tourDetail.schedules?.length &&
            this.tourDetail.schedules.at(0)?.departureDate
          ) {
            const minDate = this.tourDetail.schedules.at(0)?.departureDate;
            const maxDate = this.tourDetail.schedules.at(-1)?.departureDate;
            if (minDate) {
              this.minDate = new Date(minDate);
            }
            if (maxDate) {
              this.maxDate = new Date(maxDate);
            }
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  toggleAccordion(panelState: boolean) {
    if (this.panelOpenState == false) {
      this.accordion.openAll();
    } else {
      this.accordion.closeAll();
    }
    this.panelOpenState = !panelState;
  }
}
