import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('/api/users/authenticate', { userName: username, password: password })
                    .map(user => {
                      if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                      }

                      return user;
                    });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
