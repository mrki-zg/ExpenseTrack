import { Routes, RouterModule } from "@angular/router";

import { ExpenseListComponent } from './expense/expense-list.component';;
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: ExpenseListComponent, pathMatch: 'full', canActivate: [AuthGuard] },    
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: '**', redirectTo: '' }
]

export const routing = RouterModule.forRoot(appRoutes);
