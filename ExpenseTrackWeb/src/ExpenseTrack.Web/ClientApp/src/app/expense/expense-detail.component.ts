import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { List } from 'linqts';

import { Expense } from '../_models/expense.model';
import { ExpenseService } from '../_services/expense.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ExpenseCategoriesService } from '../_services/expense-categories.service'; 

@Component({
    selector: 'app-expense-detail',
    templateUrl: './expense-detail.component.html',
    styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {
    expense: Expense;

    category = new FormControl();
    categories: string[];

    private isCreateMode = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Expense,
        private dialogRef: MatDialogRef<ExpenseDetailComponent>,
        private expenseService: ExpenseService,
        private authenticationService: AuthenticationService,
        private expenseCategoriesService: ExpenseCategoriesService) {

        if (data == null) {
            this.expense = new Expense();
            this.expense.userId = this.authenticationService.currentUser.userId;
            this.isCreateMode = true;
        } else {
            this.expense = this.iterationCopy(data) as Expense;
            this.category.setValue(this.expense.expenseCategoryLabel);
        }
    }

    ngOnInit(): void {
        this.expenseCategoriesService.getAllForUser(this.authenticationService.currentUser.userId).subscribe(expenseCategories => {
            this.categories = new List(expenseCategories).Select(ec => ec.name).ToArray();
        }); 

        this.category.valueChanges.subscribe(newVal => {
            this.expense.expenseCategoryLabel = newVal;
        });
    }

    saveExpense(): void {
        if (!this.expense.expenseCategoryLabel) {
            return;
        }

        console.log(this.expense);

        if (this.isCreateMode) {
            this.expenseService.addExpense(this.expense).subscribe(createdExpense => {
                console.log('created expense:');
                console.log(createdExpense);
            });    
        } else {
            
        }        

        this.dialogRef.close();
    }

    private iterationCopy(src) {
        let target = {};
        for (let prop in src) {
            if (src.hasOwnProperty(prop)) {
                target[prop] = src[prop];
            }
        }
        return target;
    }
}
