import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDown,
  faArrowDown,
  faArrowRight,
  faClock,
  faCoffee,
  faLocationArrow,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  constructor(private accountService: AccountService, private router: Router) {}
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res) => {
      if (res) this.user = res;
    });
  }
  faCoffee = faCoffee as IconProp;
  faAngleDown = faAngleDown as IconProp;
  faPhone = faPhone as IconProp;
  faClock = faClock as IconProp;
  faLocationArrow = faLocationArrow as IconProp;
  faArrowRight = faArrowRight as IconProp;
  faUser = faUser as IconProp;

  title = 'showtime';
  isHidden: boolean = false;
  navbg: any = {
    background: 'linear-gradient(to right, #9d1d1e 0%, #9d1d1e 100%)',
  };

  logout() {
    this.accountService.logout();
    window.location.reload();
  }
  loginBtnClick() {
    if (window.location.pathname != '/tours') {
      this.router.navigate(['auth/login'], {
        queryParams: {
          returnUrl: this.router.url,
        },
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
  @HostListener('document:scroll') scrollover() {
    // if (document?.scrollingElement?.scrollTop != null) {
    //   console.log(document.scrollingElement.scrollTop, 'scrolllength#');
    // }

    if (
      (document?.scrollingElement?.scrollTop != null &&
        document?.scrollingElement?.scrollTop > 0) ||
      document.documentElement.scrollTop > 0
    ) {
      this.navbg = {
        background: 'linear-gradient(to right, #c02135 0%, #c02135 100%)',
      };
    } else {
      this.navbg = {
        background: 'linear-gradient(to right, #9d1d1e 0%, #9d1d1e 100%)',
      };
    }
  }
}
