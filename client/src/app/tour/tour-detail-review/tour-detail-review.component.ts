import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { ReviewResponse } from 'src/app/shared/models/ReviewResponse';
import { User } from 'src/app/shared/models/User';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { TourService } from '../tour.service';
import { Review } from 'src/app/shared/models/Review';

@Component({
  selector: 'app-tour-detail-review',
  templateUrl: './tour-detail-review.component.html',
  styleUrls: ['./tour-detail-review.component.css'],
  standalone: true,
  imports: [SharedModule, CommonModule],
})
export class TourDetailReviewComponent implements OnInit {
  @Input() reviews: ReviewResponse[] = [];
  faUser = faUser as IconProp;
  baseUrl = environment.apiUrl;
  faTrash = faTrash as IconProp;
  faPlus = faPlus as IconProp;
  user!: User;
  @Input() tourId!: number;
  @Input() tourTitle!: string;
  countReview!: number;
  review!: ReviewResponse;
  reviewToCreate!: Review;
  reviewForm!: FormGroup;
  @Input() canReview: boolean = false;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private tourService: TourService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.reviewForm = this.fb.group({
      rating: [''],
      description: [''],
    });
    this.initializeFileUploader();
  }
  ngOnInit(): void {}

  submitReview() {
    if (this.reviewForm.invalid) return;
    this.reviewToCreate = {
      ...this.reviewForm.value,
      appUserId: this.user.id,
      tourId: this.tourId,
      createdAt: new Date(),
    };
    this.tourService.createNewReview(this.reviewToCreate).subscribe((res) => {
      if (res) {
        this.uploader.setOptions({
          url: this.baseUrl + 'reviews/add-review-image/' + res.id,
          authToken: 'Bearer ' + this.user?.token,
        });
        this.uploader.uploadAll();
        window.location.reload();
      }
    });
  }

  uploader!: FileUploader;
  hasBaseDropZoneOver!: boolean;
  response!: string;
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeFileUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'tours/add-review-image',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      maxFileSize: 10 * 1024 * 1024,
      autoUpload: false,
      allowedFileType: ['image'],
      removeAfterUpload: true,
    });
    // Resolve cors
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    // Add new photo to list photo
    this.uploader.onSuccessItem = (item, response, status, header) => {
      if (response) {
        var photo = JSON.parse(response);
        // this.member?.photos.push(photo);
        // if (this.member && this.user && photo.isMain) {
        //   this.member.photoUrl = photo.url;
        //   this.user.photoUrl = photo.url;
        //   this.accountService.setCurrentUser(this.user);
        // }
      }
    };
    this.hasBaseDropZoneOver = false;
  }

  get averageRating() {
    if (this.reviews.length === 0) {
      return 0;
    }
    var average =
      this.reviews.reduce((acc, review) => acc + review.rating, 0) /
      this.reviews.length;
    return parseFloat(average.toFixed(1));
  }

  get totalReviews() {
    return this.reviews.length;
  }
}
