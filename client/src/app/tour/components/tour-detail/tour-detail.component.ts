import { Component, NgModule } from '@angular/core';
import { TourService } from '../../tour.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TourDetail } from 'src/app/shared/models/TourDetail';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css'],
  standalone: true,
  imports: [GalleryModule, CommonModule],
})
export class TourDetailComponent {
  baseUrl = environment.apiUrl;
  tourDetail!: TourDetail;
  images: GalleryItem[] = [];
  constructor(
    private tourService: TourService,
    private activedRoute: ActivatedRoute
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
