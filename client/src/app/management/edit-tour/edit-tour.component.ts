import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashCan,
  faPlus,
  faClose,
  faBackward,
} from '@fortawesome/free-solid-svg-icons';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { FileUploader } from 'ng2-file-upload';
import { take, startWith, map, Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { Departure } from 'src/app/shared/models/Departure';
import { Itinerary } from 'src/app/shared/models/Itinarary';
import { ItineraryUpdate } from 'src/app/shared/models/ItineraryUpdate';
import { Schedule } from 'src/app/shared/models/Schedule';
import { TourDetail } from 'src/app/shared/models/TourDetail';
import { TourEdit } from 'src/app/shared/models/TourEdit';
import { TourType } from 'src/app/shared/models/TourType';
import { User } from 'src/app/shared/models/User';
import { TourService } from 'src/app/tour/tour.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.css'],
})
export class EditTourComponent implements OnInit {
  departures: Departure[] = [];
  baseUrl = environment.apiUrl;
  user!: User;
  faTrash = faTrashCan as IconProp;
  faPlus = faPlus as IconProp;
  faBackward = faBackward as IconProp;
  faClose = faClose as IconProp;
  tourForm!: FormGroup;
  minDate: Date = new Date();
  tourTypes: TourType[] = [];
  tourEdit!: TourEdit;
  imageIdGalleryToDelete: number[] = [];
  imageIdItineraryToDelete: number[] = [];
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
  };
  goBack() {
    this.router.navigateByUrl('/management/tours');
  }
  constructor(
    private tourService: TourService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.tourService.getAllTourTypes().subscribe((res) => {
      if (res) {
        this.tourTypes = res;
        if (this.tourEdit) {
          this.tourForm.patchValue(this.tourEdit);
          // this.patchSchedules(this.tourEdit.schedules);
          this.patchItineraries(this.tourEdit.itineraries);
          // this.tourForm.patchValue({
          //   tourWithType: this.tourEdit.tourWithType,
          // });
        }
      }
    });
    this.tourForm = this.fb.group({
      title: ['', Validators.required],
      departure: ['', Validators.required],
      tourWithType: ['', Validators.required],
      transport: ['', Validators.required],
      description: ['', Validators.required],
      priceAdult: ['', Validators.required],
      priceChild: ['', Validators.required],
      itineraries: this.fb.array([]), // FormArray cho lịch trình
    });
    this.initializeFileUploader();
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((utility: string | null) =>
        utility ? this._filter(utility) : this.allUtilities.slice()
      )
    );

    this.filteredDurations = this.durationCtrl.valueChanges.pipe(
      startWith(null),
      map((duration: string | null) =>
        duration ? this._filterDuration(duration) : this.allDurations.slice()
      )
    );

    this.filteredDestinations = this.destinationCtrl.valueChanges.pipe(
      startWith(null),
      map((destination: string | null) =>
        destination
          ? this._filterDestination(destination)
          : this.allDestinations.slice()
      )
    );
  }

  deleteImageForTourGallery(imageId: number) {
    this.imageIdGalleryToDelete.push(imageId);
    this.tourEdit.images = this.tourEdit.images.filter((x) => x.id != imageId);
    // this.tourService
    //   .deleteImageForTourGallery(this.tourEdit.id, imageId)
    //   .subscribe((res) => {
    //     this.tourEdit.images = this.tourEdit.images.filter(
    //       (x) => x.id != imageId
    //     );
    //     console.log(res);
    //   });
  }
  deleteImageItinerary(idx: number, imageId: number) {
    this.imageIdGalleryToDelete.push(imageId);
    this.itineraries.at(idx).patchValue({ images: null });
  }

  // patchSchedules(schedules: Schedule[]) {
  //   const schedulesArray = this.tourForm.get('schedules') as FormArray;
  //   schedulesArray.clear(); // Xóa FormArray cũ nếu có

  //   schedules.forEach((schedule) => {
  //     schedulesArray.push(
  //       this.fb.group({
  //         departureDate: schedule.departureDate,
  //         returnDate: schedule.returnDate,
  //       })
  //     );
  //   });
  // }

  // Hàm thêm giá trị vào FormArray itineraries
  patchItineraries(itineraries: ItineraryUpdate[]) {
    const itinerariesArray = this.tourForm.get('itineraries') as FormArray;
    itinerariesArray.clear(); // Xóa FormArray cũ nếu có

    itineraries.forEach((itinerary) => {
      itinerariesArray.push(
        this.fb.group({
          id: itinerary.id,
          timeTravel: itinerary.timeTravel,
          title: itinerary.title,
          content: itinerary.content,
          images: itinerary.images[0],
        })
      );
    });
  }
  ngOnInit(): void {
    this.tourService.getAllDepartures().subscribe({
      next: (res) => {
        this.departures = res;
        this.allDestinations = this.departures.map((d) => d.name);
        console.log(this.allDestinations);
      },
      error: (err) => console.log(err),
    });

    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.tourEdit = data['tourEdit'];
        this.utilities = this.tourEdit.utilities;
        this.topPlaces = this.tourEdit.topPlaces;
        this.destinations = this.tourEdit.destination.split(',');
        this.durations = this.tourEdit.duration.split(',');
        console.log(this.tourEdit);
        // var tour = {
        //   ...this.tourForm.value,
        //   utilities: this.utilities,
        //   destination: this.destinations.toString(),
        //   topPlaces: this.topPlaces,
        //   duration: this.durations.toString(),
        //   transport: this.tourForm.controls['transport'].value.toString(),
        //   createdAt: new Date(),
        //   tourWithType: tourwithtype,
        //   schedules: schedulesToSave,
        //   itineraries: itinerariesToSave,
        // };
      },
    });
  }
  updateTour() {
    var tourwithtype: object[] = [];
    this.tourForm.controls['tourWithType'].value.forEach((element: string) => {
      tourwithtype.push({
        tourTypeId: element,
      });
    });
    var imageItineraries = this.tourForm.controls['itineraries'].value.map(
      (x: any) => x.images
    );
    imageItineraries = Array.from(imageItineraries);
    var itinerariesToSave = this.tourForm.controls['itineraries'].value.map(
      (x: any) => {
        return {
          ...x,
          images:
            x.images != null && x.images.id != null
              ? [
                  {
                    id: x.images.id,
                    publicId: x.images.publicId,
                    url: x.images.url,
                    itineraryId: x.id,
                  },
                ]
              : null,
        };
      }
    );
    var tour = {
      id: this.tourEdit.id,
      ...this.tourForm.value,
      utilities: this.utilities,
      destination: this.destinations.toString(),
      topPlaces: this.topPlaces,
      duration: this.durations.toString(),
      transport: this.tourForm.controls['transport'].value.toString(),
      createdAt: this.tourEdit.createdAt,
      tourWithType: tourwithtype,
      itineraries: itinerariesToSave,
    };
    console.log(tour);

    this.tourService.updateTour(tour).subscribe((res: any) => {
      if (res) {
        console.log(res);
        // Add new image for tour gallery
        if (this.uploader.queue.length > 0) {
          this.uploader.setOptions({
            url: this.baseUrl + 'tours/add-tour-image/' + res.id,
          });
          this.uploader.uploadAll();
        }
        this.imageIdGalleryToDelete.forEach((imageId) => {
          this.tourService
            .deleteImageForTourGallery(this.tourEdit.id, imageId)
            .subscribe((res) => {
              // this.tourEdit.images = this.tourEdit.images.filter(
              //   (x) => x.id != imageId
              // );
              console.log(res);
            });
        });
        if (this.imageIdGalleryToDelete.length > 0) {
        }
        var itinerariesStore = [...res.itineraries];
        console.log(itinerariesStore);
        for (let i = 0; i < itinerariesStore.length; i++) {
          if (
            imageItineraries[i] == null ||
            imageItineraries[i].id != null ||
            imageItineraries[i].id == ''
          ) {
            {
              continue;
            }
          }
          // if (itinerariesStore[i].images.length == 0) {
          //   continue;
          // }
          const uploaderDynamic = new FileUploader({
            url:
              this.baseUrl +
              'itineraries/add-new-photo/' +
              res.id +
              '/' +
              itinerariesStore[i].id,
            authToken: 'Bearer ' + this.user?.token,
            isHTML5: true,
            maxFileSize: 20 * 1024 * 1024,
            autoUpload: false,
            allowedFileType: ['image'],
            removeAfterUpload: true,
          });
          // Resolve cors
          uploaderDynamic.onAfterAddingFile = (file) => {
            file.withCredentials = false;
          };

          uploaderDynamic.addToQueue([imageItineraries[i]]);
          uploaderDynamic.uploadAll();
          if (i == itinerariesStore.length - 1) {
          }
        }
        this.router.navigateByUrl('/management/tours');

        this.uploader.onCompleteAll = () => {
          // this.router.navigateByUrl('/management/tours');
          // console.log('Upload completed');
        };
      }
    });
  }

  get itineraries(): FormArray {
    return this.tourForm.get('itineraries') as FormArray;
  }
  deleteItem(index: number) {
    this.imageIdItineraryToDelete.push(this.itineraries.at(index).value.images);
    this.itineraries.removeAt(index);
  }

  addItem() {
    this.itineraries.push(
      this.fb.group({
        timeTravel: [''],
        title: [''],
        content: [''],
        images: new FormControl(null),
      })
    );
  }

  onImagePicked(event: Event, idx: number) {
    var target = event.target;
    if (target == null) return;
    const files = (target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file = files[0];
      this.itineraries.controls[idx].patchValue({ images: file });
    }

    console.log(this.itineraries.controls[idx].value);
    // Here we use only the first file (single file)
  }

  durationCtrl = new FormControl(''); // Input value control
  filteredDurations: Observable<string[]>;
  durations: string[] = ['Trong ngày']; // Input value string to display
  allDurations: string[] = [
    // List of option value
    'Trong ngày',
    '2N1D',
    '3N2D',
    '4N3D',
    '5N4D',
    '6N5D',
    '7N6D',
    '8N7D',
  ];

  destinationCtrl = new FormControl(''); // Input value control
  filteredDestinations: Observable<string[]>;
  destinations: string[] = ['Bắc Ninh']; // Input value string to display
  allDestinations: string[] = [
    'Hà Nội',
    'Hồ Chí Minh',
    'Hải Phòng',
    'Nha Trang',
    'Hàn Quốc',
    'Trung Quốc',
    'Úc',
    'Đà Lạt',
    'Sapa',
    'Bắc Ninh',
    'Đà Nẵng',
    'Nhật Bản',
  ];

  topPlaceCtrl = new FormControl(''); // Input value control
  filteredTopPlaces!: Observable<string[]>;
  topPlaces: string[] = []; // Input value string to display

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl(''); // Input value control
  filteredFruits: Observable<string[]>;
  utilities: string[] = ['Hướng dẫn viên']; // Input value string to display
  allUtilities: string[] = [
    // List of option value
    'Vé máy bay',
    'Xe tham quan',
    'Khách sạn 3-4*',
    'Vé tham quan',
    'Bảo hiểm du lịch',
    'Bữa ăn',
    'Hướng dẫn viên',
    'Khách Sạn 4*',
    'Cano',
    'Visa',
  ];

  @ViewChild('utilityInput') fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('durationInput') durationInput!: ElementRef<HTMLInputElement>;
  @ViewChild('destinationInput')
  destinationInput!: ElementRef<HTMLInputElement>;
  @ViewChild('topPlaceInput') topPlaceInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.utilities.push(value);
    }
    console.log(this.utilities);
    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.utilities.indexOf(fruit);

    if (index >= 0) {
      this.utilities.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.utilities.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUtilities.filter((utility) =>
      utility.toLowerCase().includes(filterValue)
    );
  }

  addDuration(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.durations.pop();
      this.durations.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.durationCtrl.setValue(null);
  }

  removeDuration(fruit: string): void {
    const index = this.durations.indexOf(fruit);

    if (index >= 0) {
      this.durations.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selectedDuration(event: MatAutocompleteSelectedEvent): void {
    this.durations.pop();
    this.durations.push(event.option.viewValue);
    this.durationInput.nativeElement.value = '';
    this.durationCtrl.setValue(null);
  }

  private _filterDuration(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allDurations.filter((duration) =>
      duration.toLowerCase().includes(filterValue)
    );
  }

  // Destination
  addDestination(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.destinations.pop();
      this.destinations.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.destinationCtrl.setValue(null);
  }

  removeDestination(fruit: string): void {
    const index = this.destinations.indexOf(fruit);

    if (index >= 0) {
      this.destinations.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selectedDestination(event: MatAutocompleteSelectedEvent): void {
    this.destinations.pop();
    this.destinations.push(event.option.viewValue);
    this.destinationInput.nativeElement.value = '';
    this.destinationCtrl.setValue(null);
  }

  private _filterDestination(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allDestinations.filter((destination) =>
      destination.toLowerCase().includes(filterValue)
    );
  }

  // Top Place
  addTopPlace(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.topPlaces.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.topPlaceCtrl.setValue(null);
  }

  removeTopPlace(fruit: string): void {
    const index = this.topPlaces.indexOf(fruit);

    if (index >= 0) {
      this.topPlaces.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selectedTopPlace(event: MatAutocompleteSelectedEvent): void {
    this.topPlaces.push(event.option.viewValue);
    this.topPlaceInput.nativeElement.value = '';
    this.topPlaceCtrl.setValue(null);
  }

  // Image Uploaded

  uploader!: FileUploader;

  uploader2!: FileUploader;
  hasBaseDropZoneOver!: boolean;
  response!: string;
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeFileUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'tours/add-tour-image',
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

    this.uploader2 = new FileUploader({
      url: this.baseUrl + 'itineraries/add-new-photo/',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      maxFileSize: 10 * 1024 * 1024,
      autoUpload: false,
      allowedFileType: ['image'],
      removeAfterUpload: true,
    });
    // Resolve cors
    this.uploader2.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    // Add new photo to list photo
    this.uploader2.onSuccessItem = (item, response, status, header) => {
      if (response) {
        var photo = JSON.parse(response);
      }
    };
    this.hasBaseDropZoneOver = false;
  }
}
