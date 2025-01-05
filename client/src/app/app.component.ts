import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  constructor(
    private spinnerService: NgxSpinnerService,
    private accountService: AccountService
  ) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 3000);
    this.loadCurrentUser();
  }
  loadCurrentUser() {
    var token = localStorage.getItem('token');
    if (token) this.accountService.loadCurrentUser(token).subscribe();
  }
}
