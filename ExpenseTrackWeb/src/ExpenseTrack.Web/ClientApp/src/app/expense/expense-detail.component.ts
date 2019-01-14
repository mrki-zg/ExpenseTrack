import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Expense } from '../_models/expense.model';
import { FormControl } from '@angular/forms';
import { ExpenseService } from '../_services/expense.service';

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
        private expenseService: ExpenseService) {

        if (data == null) {
            this.expense = new Expense();
            this.isCreateMode = true;
        } else {
            this.expense = this.iterationCopy(data) as Expense;
            this.category.setValue(this.expense.expenseCategoryLabel);
        }
    }

    ngOnInit(): void {
        // TO-DO: load categories
        this.categories = ['Food', 'Living'];
        this.category.valueChanges.subscribe(newVal => {
            this.expense.expenseCategoryLabel = newVal;
        });
    }

    saveExpense(): void {
        if (!this.expense.expenseCategoryLabel) {
            return;
        }

        console.log(this.expense);

        // TODO save expense

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
