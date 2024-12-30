import { DatePipe } from '@angular/common';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCar,
  faClock,
  faPlane,
  faTrain,
} from '@fortawesome/free-solid-svg-icons';
import { StringUtility } from 'src/app/shared/models/StringUtility';
import { Tour } from 'src/app/shared/models/Tour';

@Component({
  selector: 'app-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.css'],
})
export class TourItemComponent implements OnInit {
  constructor(private datePipe: DatePipe) {}
  ngOnInit(): void {}
  faClock = faClock as IconProp;
  faPlane = faPlane as IconProp;
  faTrain = faTrain as IconProp;
  faCar = faCar as IconProp;
  @Input() tour!: Tour;
  today: Date = new Date();
}
