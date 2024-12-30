import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  faArrowLeft = faArrowLeft as IconProp;
  loginForm!: FormGroup;
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
  ngOnDestroy(): void {
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.remove('hidden');
    }
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  loginButtonClicked() {
    if (!this.loginForm.value) return;

    this.accountService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigateByUrl('/tours');
          var footer = document.querySelector('.home-page-footer');
          if (footer) {
            footer.classList.add('hidden');
          }
        }
      },
      error: (err) => {
        // console.log(err);
        var errStr = err.title;
        if (errStr == 'Unauthorized' || err.status == 401) {
          errStr = 'Tên đăng nhập hoặc mật khẩu không đúng';
        }
        // if (Array.isArray(err.error)) {
        //   err.error.forEach((element: string) => {
        //     errStr += element + '\n';
        //   });
        // } else {
        //   errStr = err.error;
        // }
        this.matDiaLog.open(NotificationComponent, {
          data: {
            title: 'Đã có lỗi xảy ra',
            message: errStr,
          },
        });
      },
    });
  }
}
