import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tour',
    pathMatch: 'full',
  },
  {
    path: 'tour',
    loadChildren: () => import('./tour/tour.module').then((m) => m.TourModule),
  },
  {
    path: 'recommend',
    loadChildren: () =>
      import('./recommend/recommend.module').then((m) => m.RecommendModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
