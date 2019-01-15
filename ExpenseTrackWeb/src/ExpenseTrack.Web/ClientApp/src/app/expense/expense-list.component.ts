import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'

import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpenseService } from '../_services/expense.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Expense } from '../_models/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[];

  constructor(
    private expenseService: ExpenseService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  createNewExpense() {
    var dialog = this.dialog.open(ExpenseDetailComponent, {
      height: '500px',
      width: '700px',
      maxHeight: '800px',
      maxWidth: '1200px'
    });
    dialog.afterClosed().subscribe(() => {
      this.loadExpenses();
    }); 
  }

  editExpense(expense: Expense) {
    var dialog = this.dialog.open(ExpenseDetailComponent, {
      height: '500px',
      width: '700px',
      maxHeight: '800px',
      maxWidth: '1200px',
      data: expense
    });
    dialog.afterClosed().subscribe(() => {
      this.loadExpenses();
    }); 
  }

  deleteExpense(expense: Expense) {
    this.expenseService.deleteExpense(expense.expenseEntryId).subscribe(expense => {
      this.loadExpenses();
    });
  }

  private loadExpenses() {
    this.expenseService.getAllForUser(this.authenticationService.currentUser.userId).subscribe(expenses => {
      this.expenses = expenses;
    })
  }
}
