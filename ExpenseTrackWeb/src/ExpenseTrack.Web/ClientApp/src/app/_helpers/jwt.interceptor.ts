import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler) {
		// add authorization header with jwt token if available
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		if (currentUser && currentUser.token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.token}`
				}
			});
		}

		return next.handle(request);
	}
}
