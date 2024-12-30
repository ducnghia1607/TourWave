import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  faArrowLeft = faArrowLeft as IconProp;
  registerForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private matDiaLog: MatDialog
  ) {
    this.initializeForm();
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.add('hidden');
    }
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl(''),
      userName: new FormControl('', Validators.required),
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      confirmPassword: [
        '',
        {
          validators: [Validators.required, this.matchValues('password')],
        },
      ],
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }
  registerButtonClicked() {
    if (!this.registerForm.value) return;
    var model = {
      fullName: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      userName: this.registerForm.value.userName,
      password: this.registerForm.value.password,
    };
    this.accountService.register(model).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigateByUrl('/tours');
        }
      },
      error: (err) => {
        console.log(err);
        var errStr = '';
        if (Array.isArray(err.error)) {
          err.error.forEach((element: string) => {
            errStr += element + '\n';
          });
        } else {
          errStr = err.error;
        }
        this.matDiaLog.open(NotificationComponent, {
          data: {
            title: 'Đã có lỗi xảy ra',
            message: errStr,
          },
        });
      },
    });
    // console.log(this.registerForm.value);
  }

  ngOnDestroy(): void {
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.remove('hidden');
    }
  }
}
