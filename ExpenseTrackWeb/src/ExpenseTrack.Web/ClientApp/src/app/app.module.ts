import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ExpenseListComponent } from './expense/expense-list.component';
import { ExpenseDetailComponent } from './expense/expense-detail.component';
import { AlertComponent } from './_directives/alert.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';

import { SumExpensesPipe } from './_pipes/sum-expense.pipe';

import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { ExpenseService } from './_services/expense.service';
import { ExpenseCategoriesService } from './_services/expense-categories.service';

import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { routing } from './app.routing';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,    
    AlertComponent,
    ExpenseListComponent,
    ExpenseDetailComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,

    // pipes
    SumExpensesPipe
  ],

  entryComponents: [
    ExpenseDetailComponent
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    routing,

    // material
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],

  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AlertService,
    AuthenticationService,
    UserService,
    ExpenseService,
    ExpenseCategoriesService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
