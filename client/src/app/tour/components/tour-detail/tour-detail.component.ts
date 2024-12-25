import { Component, Inject, NgModule } from '@angular/core';
import { TourService } from '../../tour.service';
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
} from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css'],
  standalone: true,
  imports: [CommonModule, GalleryModule, SharedModule, FontAwesomeModule],
})
export class TourDetailComponent {
  faPlane = faPlane as IconProp;
  faTrain = faTrain as IconProp;
  faCar = faCar as IconProp;
  faCheck = faCheck as IconProp;
  baseUrl = environment.apiUrl;
  tourDetail!: TourDetail;
  images: GalleryItem[] = [];
  constructor(
    private tourService: TourService,
    @Inject(ActivatedRoute) private activedRoute: ActivatedRoute
  ) {
    this.GetTourById();
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
        },
        error: (err) => console.log(err),
      });
    }
  }
}
