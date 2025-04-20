import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, finalize, throwError } from "rxjs";
import { LoadingService } from "../services/loading.service";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const loadingService = inject(LoadingService);
  const shouldShowLoading = req.url.includes('roomflow-api');

  if (shouldShowLoading) {
    loadingService.show();
  }
  
  const clonedRequest = req.clone({
    setHeaders: {
      "Authorization": `Bearer ${authService.getToken() ?? ""}`,
    },
  });

  return next(clonedRequest).pipe(
    catchError((error) => {
      return throwError(() => error);
    }),
    finalize(() => {
      if (shouldShowLoading) {
        loadingService.hide();
      }
    })
  );
}