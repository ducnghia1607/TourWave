import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourRecommendRecentComponent } from './tour-recommend-recent.component';

describe('TourRecommendRecentComponent', () => {
  let component: TourRecommendRecentComponent;
  let fixture: ComponentFixture<TourRecommendRecentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourRecommendRecentComponent]
    });
    fixture = TestBed.createComponent(TourRecommendRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
