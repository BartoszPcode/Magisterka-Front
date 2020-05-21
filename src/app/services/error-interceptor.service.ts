import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorisationService } from './authorisation.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {
  constructor(private authenticationService: AuthorisationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              location.reload(true);
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
      }))
  }
}
