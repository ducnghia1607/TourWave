import { Component, Input } from '@angular/core';
import {
  faCar,
  faClock,
  faPlane,
  faTrain,
} from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/shared/models/Tour';

@Component({
  selector: 'app-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.css'],
})
export class TourItemComponent {
  faClock = faClock;
  faPlane = faPlane;
  faTrain = faTrain;
  faCar = faCar;
  @Input() tour!: Tour;
}
