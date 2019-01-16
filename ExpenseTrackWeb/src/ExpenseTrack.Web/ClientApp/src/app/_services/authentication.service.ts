
import {map} from 'rxjs/operators';
import { User } from './../_models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private currentUserSubject = new Subject<User>();

  constructor(private http: HttpClient) { 
    this.currentUserSubject.next(this.currentUser);
  }

  get currentUser(): User {
    let currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    }
  }

  onCurrentUserChange() {
    return this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/users/authenticate', { userName: username, password: password }).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
