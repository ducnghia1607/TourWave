import { Component, EventEmitter, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tour-finder-sidebar',
  templateUrl: './tour-finder-sidebar.component.html',
  styleUrls: ['./tour-finder-sidebar.component.css'],
})
export class TourFinderSidebarComponent {
  faArrowsUpDown = faArrowsUpDown as IconProp;
  @Output() clickTourSidebar = new EventEmitter<string>();
  OnclickTourSidebar(link: string) {
    this.clickTourSidebar.emit(link);
    if (document.scrollingElement) {
      document.scrollingElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
