import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ExpenseCategory } from '../_models/expense.model';

@Injectable()
export class ExpenseCategoriesService {

  private readonly apiPrefix = "api/expensecategories";

  constructor(private http: HttpClient) { }

  getAllForUser(userId: number) {
    return this.http.get<ExpenseCategory[]>(this.apiPrefix + "/" + userId);
  }
}
