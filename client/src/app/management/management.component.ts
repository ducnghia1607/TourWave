import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.remove('hidden');
    }
    const navbarElement = document.getElementById('main-header');
    navbarElement?.classList.remove('hidden');
  }
  ngOnInit(): void {
    var footer = document.querySelector('.home-page-footer');
    if (footer) {
      footer.classList.add('hidden');
    }
    const navbarElement = document.getElementById('main-header');
    navbarElement?.classList.add('hidden');
  }
}
