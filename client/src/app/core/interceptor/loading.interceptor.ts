import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { delay, finalize, identity, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    var request = request.clone();
    // // Khi check email thì không hiện spinner
    if (
      request.url.includes('emailExists') ||
      (request.method === 'POST' && request.url.includes('orders')) ||
      request.url.includes('search-temp')
    ) {
      return next.handle(request);
    }
    this.busyService.busy();
    return next.handle(request).pipe(
      environment.production ? identity : delay(0),
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
}
