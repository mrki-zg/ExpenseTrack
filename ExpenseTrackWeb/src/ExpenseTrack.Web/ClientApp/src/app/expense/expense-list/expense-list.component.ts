import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material'

import { ExpenseDetailComponent } from '../expense-detail/expense-detail.component';
import { ExpenseService } from '../../_services/expense.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { Expense } from '../../_models/expense.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'expenseCategoryLabel', 'description', 'created', 'value', 'btns']
  displayedFooterColumns: string[] = ['value'];
  expenses: Expense[] = [];
  dataSource = new MatTableDataSource<Expense>(this.expenses);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private expenseService: ExpenseService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) { 
      breakpointObserver.observe([
        Breakpoints.Handset
      ]).subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['title', 'expenseCategoryLabel', 'value', 'btns'];
        }
      });
      breakpointObserver.observe([
        Breakpoints.Tablet,
        Breakpoints.Web
      ]).subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['title', 'expenseCategoryLabel', 'description', 'created', 'value', 'btns']
        }
      });
    }

  ngOnInit(): void {
    this.loadExpenses();
    this.dataSource.paginator = this.paginator;
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
      this.dataSource.disconnect();
      this.dataSource = new MatTableDataSource<Expense>(this.expenses);
      this.dataSource.paginator = this.paginator;
    })
  }
}
