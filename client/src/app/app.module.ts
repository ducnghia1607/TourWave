import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from './shared/models/MY_FORMATS';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TourDetailComponent } from './tour/tour-detail/tour-detail.component';
import { RecommendModule } from './recommend/recommend.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeVi, 'vi-VN');
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    TourDetailComponent,
    RecommendModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
