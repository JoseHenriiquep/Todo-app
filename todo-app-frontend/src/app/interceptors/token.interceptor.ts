import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const TokenInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn
):Observable<HttpEvent<unknown>> => {
    const token = localStorage.getItem('token');
    if (token) {
        const tokenReq = req.clone({
            setHeaders:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }) ;
        return next(tokenReq);
        }
    return next(req);
}
