import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { ExpenseRouting } from "./expense.routing";

import { HomeComponent } from "./home.component";
import { ExpenseDetailComponent } from "./expense-detail/expense-detail.component";
import { ExpenseListComponent } from "./expense-list/expense-list.component";

import { SumExpensesPipe } from "./_pipes/sum-expense.pipe";

import { ExpenseService } from "./_services/expense.service";
import { ExpenseCategoriesService } from "./_services/expense-categories.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ExpenseRouting,
		// material
		BrowserAnimationsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatInputModule,
		MatIconModule,
		MatToolbarModule,
		MatCardModule,
		MatSidenavModule,
		MatInputModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule,
		MatCardModule
	],
	declarations: [
		ExpenseDetailComponent,
		ExpenseListComponent,
		HomeComponent,
		// pipes
		SumExpensesPipe
	],
	providers: [ExpenseService, ExpenseCategoriesService]
})
export class ExpenseModule {}
