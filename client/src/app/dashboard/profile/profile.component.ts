import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  editMode = false;
  editId = '';
  user!: User;
  profileForm = this.fb.group({
    fullName: ['', Validators.required],
    email: [''],
    phone: [''],
    dateOfBirth: [''],
    gender: [''], // 1 : Male , 0 : Female
    address: [''],
  });
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.accountService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
        this.profileForm.patchValue(this.user);
      }
    });
  }

  editProfileClick(id: string) {
    if (this.editMode) {
      return;
    }
    this.editId = id;
    this.editMode = true;
  }

  saveProfileClick(id: string) {
    if (this.profileForm.invalid) return;
    var update: string = '';
    if (id == '1') {
      if (this.profileForm.controls['fullName'].value == null) return;
      update = this.profileForm.controls['fullName'].value;
      this.user = { ...this.user, fullName: update };
    } else if (id == '2') {
      if (this.profileForm.controls['email'].value == null) return;
      update = this.profileForm.controls['email'].value;
    } else if (id == '3') {
      if (this.profileForm.controls['phone'].value == null) return;
      update = this.profileForm.controls['phone'].value;
    } else if (id == '4') {
      if (this.profileForm.controls['dateOfBirth'].value == null) return;
      update = this.datePipe.transform(
        this.profileForm.controls['dateOfBirth'].value,
        'yyyy-MM-dd'
      ) as string;
    } else if (id == '5') {
      if (this.profileForm.controls['gender'].value == null) return;
      update = this.profileForm.controls['gender'].value;
    } else if (id == '6') {
      if (this.profileForm.controls['address'].value == null) return;
      update = this.profileForm.controls['address'].value;
    }
    var updateDto = {
      update: update,
      id: id,
    };
    this.accountService
      .updateAccountInfo(this.user.id, updateDto)
      .subscribe((res) => {
        if (res) {
          this.user = { ...res, id: this.user.id };
          this.profileForm.patchValue(this.user);
          this.editMode = false;
          this.editId = '';
        }
      });
  }

  cancelEditClick() {
    this.editMode = false;
    this.editId = '';
  }
}
