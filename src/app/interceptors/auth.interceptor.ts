import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const snackBar = inject(MatSnackBar);
  
    const clonedRequest = req.clone({
      setHeaders: {
        "Authorization": `Bearer ${authService.getToken() ?? ""}`,
      },
    });
  
    return next(clonedRequest).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
}