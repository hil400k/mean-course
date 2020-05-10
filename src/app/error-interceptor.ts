import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { DialogService } from './ui/dialog/dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialog: DialogService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let err = 'Unknown error';
        if (error.error.message) {
          err = error.error.message;
        }
        this.dialog.show(ErrorComponent, {
          data: {
            message: err
          }
        });
        return throwError(error);
      })
    );
  }
}
