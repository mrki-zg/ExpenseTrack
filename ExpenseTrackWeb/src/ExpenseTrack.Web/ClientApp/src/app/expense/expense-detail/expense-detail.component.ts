import { Component, OnInit, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { Expense } from "../_models/expense.model";
import { ExpenseService } from "../_services/expense.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { ExpenseCategoriesService } from "../_services/expense-categories.service";

@Component({
	selector: "app-expense-detail",
	templateUrl: "./expense-detail.component.html",
	styleUrls: ["./expense-detail.component.css"]
})
export class ExpenseDetailComponent implements OnInit {
	expense: Expense;

	category = new FormControl();
	categories: string[];
	filteredCategories: Observable<string[]>;

	private isCreateMode = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Expense,
		private dialogRef: MatDialogRef<ExpenseDetailComponent>,
		private expenseService: ExpenseService,
		private authenticationService: AuthenticationService,
		private expenseCategoriesService: ExpenseCategoriesService
	) {
		const x = 2;

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
		this.expenseCategoriesService
			.getAllForUser(this.authenticationService.currentUser.userId)
			.subscribe((expenseCategories) => {
				this.categories = expenseCategories.map((e) => e.name);
				if (this.category.value == null) {
					this.category.setValue("");
				}
			});

		this.category.valueChanges.subscribe((newVal) => {
			this.expense.expenseCategoryLabel = newVal;
		});

		this.filteredCategories = this.category.valueChanges.pipe(
			startWith(""),
			map((value) => {
				if (this.categories == null) {
					return [];
				}

				return this.categories.filter((category) =>
					category.includes(value)
				);
			})
		);
	}

	saveExpense(): void {
		if (!this.expense.expenseCategoryLabel) {
			return;
		}

		console.log(this.expense);

		if (this.isCreateMode) {
			this.expenseService
				.addExpense(this.expense)
				.subscribe((createdExpense) => {
					console.log("created expense:");
					console.log(createdExpense);
				});
		} else {
			this.expenseService
				.updateExpense(this.expense.expenseEntryId, this.expense)
				.subscribe((updatedExpense) => {
					console.log("updated expense:");
					console.log(updatedExpense);
				});
		}

		this.dialogRef.close();
	}

	private iterationCopy(src) {
		const target = {};
		for (const prop in src) {
			if (src.hasOwnProperty(prop)) {
				target[prop] = src[prop];
			}
		}
		return target;
	}
}
