import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map, Observable } from 'rxjs';
import { Departure } from 'src/app/shared/models/Departure';
import { TourService } from 'src/app/tour/tour.service';

@Component({
  selector: 'app-create-new-tour',
  templateUrl: './create-new-tour.component.html',
  styleUrls: ['./create-new-tour.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateNewTourComponent implements OnInit {
  departures: Departure[] = [];
  constructor(private tourService: TourService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }
  ngOnInit(): void {
    this.tourService.getAllDepartures().subscribe({
      next: (res) => {
        this.departures = res;
        // this.selectedDeparture = this.departures[0].name;
      },
      error: (err) => console.log(err),
    });
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Hướng dẫn viên'];
  allFruits: string[] = [
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

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
}
