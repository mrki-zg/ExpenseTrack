import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../_guards/auth.guard";
import { ExpenseListComponent } from "./expense-list/expense-list.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
	{
		path: "dashboard",
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: "expenses", component: ExpenseListComponent },
			{ path: "", redirectTo: "expenses", pathMatch: "full" }
		]
	}
];

export const ExpenseRouting = RouterModule.forChild(routes);
