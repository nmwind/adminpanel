import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { WatchHttpErrorService } from "@features/watch-http-errors/services/watch-http-error.service";
import { catchError, throwError } from "rxjs";


export const watchHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const service = inject(WatchHttpErrorService);
    return next(req).pipe(
        catchError((err: HttpErrorResponse, caught) => {
            service.put(err);
            return throwError(() => caught);
        })
    );
};
