import { Component } from '@angular/core';

@Component({
  selector: 'app-tour-detail-navbar',
  templateUrl: './tour-detail-navbar.component.html',
  styleUrls: ['./tour-detail-navbar.component.css'],
  standalone: true,
})
export class TourDetailNavbarComponent {
  isHidden: boolean = true;
  isTabNameActive: string = '';
  scrollToSection(sectionId: string) {
    // Click to scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
