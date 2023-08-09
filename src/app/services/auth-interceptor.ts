import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PostmanService } from "./postman.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private postmanService: PostmanService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.postmanService.getToken();
    console.log(authToken)
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `${authToken}`)
    });
    return next.handle(authRequest);
  }
}
