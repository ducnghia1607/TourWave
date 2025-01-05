import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faGreaterThan,
  faHouse,
  faLessThan,
  faPhone,
  faSuitcase,
  faSuitcaseRolling,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.css'],
})
export class ManagementSidebarComponent {
  IsSidebarExpanded: boolean = true;
  activeId: string = '2';
  isActive!: null;
  isExpanded: boolean = true;
  faGreaterThan = faGreaterThan as IconProp;
  faLessThan = faLessThan as IconProp;
  constructor(private router: Router) {}
  toggleSidebar() {
    this.IsSidebarExpanded = !this.IsSidebarExpanded;
    this.isExpanded = !this.isExpanded;
  }

  faPhone = faPhone as IconProp;
  faHouse = faHouse as IconProp;
  faSuitcaseRolling = faSuitcaseRolling as IconProp;
  faUser = faUser as IconProp;
  navigateSidebar(id: string) {
    if (id == '1') {
      this.router.navigate(['/tours']);
    } else if (id == '2') {
      this.router.navigate(['/management/tours']);
    } else if (id == '3') {
      this.router.navigate(['/management/booking']);
    } else if (id == '4') {
      this.router.navigate(['/management/consulting']);
    }
    this.activeId = id;
  }
}
