import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './../_models/user.model';

@Injectable()
export class UserService {

  private readonly apiPrefix = "api/users";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.apiPrefix);
  }

  getById(id: number) {
    return this.http.get<User>(this.apiPrefix + '/' + id);
  }

  create(user: User) {
    return this.http.post<User>(this.apiPrefix, user);
  }

  update(user: User) {
    return this.http.put(this.apiPrefix + '/' + user.userId, user);
  }

  delete(id: number) {
    return this.http.delete(this.apiPrefix + '/' + id);
  }
}
