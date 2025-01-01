import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { Consulting } from 'src/app/shared/models/Consulting';
import { User } from 'src/app/shared/models/User';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-tour-consulting-dialog',
  templateUrl: './tour-consulting-dialog.component.html',
  styleUrls: ['./tour-consulting-dialog.component.css'],
  standalone: true,
  imports: [SharedModule, CommonModule],
})
export class TourConsultingDialogComponent implements OnInit {
  consultingForm!: FormGroup;
  user!: User;
  consulting: any = {
    fullName: '',
    phone: '',
    email: '',
    note: '',
    appUserId: '',
    tourId: '',
  };
  @Output() consultingRequest = new EventEmitter<Consulting>();
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initializeFormGroup();
  }
  initializeFormGroup() {
    this.consultingForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl(''),
      other: new FormControl(''),
    });
  }
  sendConsultingRequest() {
    console.log(this.consultingForm.value);
    if (this.consultingForm.value) {
      this.consulting.fullName = this.consultingForm.value.name;
      this.consulting.phone = this.consultingForm.value.phone;
      this.consulting.email = this.consultingForm.value.email;
      this.consulting.note = this.consultingForm.value.other;
      this.consultingRequest.emit(this.consulting);
    }
    console.log(this.consultingForm.value);
  }
}
