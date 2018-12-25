import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { LoginComponent } from "./login/login.component";

import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'counter', component: CounterComponent, canActivate: [AuthGuard] },
    { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    { path: '**', redirectTo: '' }
]

export const routing = RouterModule.forRoot(appRoutes);