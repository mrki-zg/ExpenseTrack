import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
     
    { path: '**', redirectTo: '' }
]

export const routing = RouterModule.forRoot(appRoutes);
