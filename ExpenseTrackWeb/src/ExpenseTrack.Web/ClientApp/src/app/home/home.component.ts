import { Component, OnInit } from '@angular/core';

import { ExpenseService } from '../_services/expense.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Expense } from '../_models/expense.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  
  expenses: Expense[];

  constructor(
    private expenseService: ExpenseService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  private loadExpenses() {
    this.expenseService.getAllForUser(this.authenticationService.currentUser.userId).subscribe(expenses => {
      this.expenses = expenses;
    })
  }
}
