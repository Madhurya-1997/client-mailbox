import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true
    })
    return next.handle(modifiedReq);

    /* To watch events around a request
     .pipe(
       tap((val) => {
         if (val.type === HttpEventType.Sent) {
           console.log('Request sent...');
         }
         if (val.type === HttpEventType.Response) {
           console.log('Got a response from the API', val)
         }
       })
     )
    */
  }
}
