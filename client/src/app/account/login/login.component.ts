import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TourDetailNavbarComponent } from 'src/app/tour/tour-detail-navbar/tour-detail-navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy, AfterViewInit {
  faArrowLeft = faArrowLeft as IconProp;
  loginForm!: FormGroup;
  validationErrors: string[] = [];
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private matDiaLog: MatDialog,
    private activedRoute: ActivatedRoute
  ) {
    this.initializeForm();
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.add('hidden');
    }
    this.activedRoute.queryParamMap.subscribe((params) => {
      this.returnUrl = params.get('returnUrl') || '';
    });
    const navbarElement = document.getElementById('main-header');
    navbarElement?.classList.remove('hidden');
  }
  ngAfterViewInit(): void {}
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
          if (this.returnUrl != '') {
            this.router.navigate([this.returnUrl]);
            // this.router.navigateBy(this.returnUrl);
          } else {
            this.router.navigateByUrl('/tours');
          }
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
        this.matDiaLog.open(NotificationComponent, {
          data: {
            title: 'Thông báo',
            message: errStr,
          },
        });
      },
    });
  }
  goBack() {
    if (this.returnUrl != '') {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.router.navigateByUrl('/tours');
    }
  }
}
