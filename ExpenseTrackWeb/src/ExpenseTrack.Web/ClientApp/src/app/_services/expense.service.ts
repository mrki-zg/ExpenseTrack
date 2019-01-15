import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Expense } from './../_models/expense.model';

@Injectable()
export class ExpenseService {

  private readonly apiPrefix = "api/expenses";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Expense[]>(this.apiPrefix);
  }

  getAllForUser(userId: number) {
    return this.http.get<Expense[]>(this.apiPrefix + '/' + userId)
  }

  addExpense(expense: Expense) {
    return this.http.post<Expense>(this.apiPrefix, expense);
  }

  deleteExpense(expenseEntryId: number) {
    return this.http.delete<Expense>(this.apiPrefix + "/" + expenseEntryId);
  }

  updateExpense(expenseEntryId: number, expense: Expense) {
    return this.http.put<Expense>(this.apiPrefix + "/" + expenseEntryId, expense);
  }
}
