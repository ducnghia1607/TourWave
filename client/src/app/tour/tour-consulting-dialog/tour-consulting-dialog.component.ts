import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-tour-consulting-dialog',
  templateUrl: './tour-consulting-dialog.component.html',
  styleUrls: ['./tour-consulting-dialog.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class TourConsultingDialogComponent implements OnInit {
  consultingForm!: FormGroup;
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
  }
}
