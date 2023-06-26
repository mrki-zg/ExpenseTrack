import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ExpenseModule } from './expense/expense.module';

import { AppComponent } from './app.component';
import { AlertComponent } from './_directives/alert.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';

import { routing } from './app.routing';

import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { RegisterComponent } from './register/register.component';

@NgModule({
   declarations: [
      AppComponent,
      AlertComponent,
      LoginComponent,
      RegisterComponent,
   ],
   imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,

    routing,

    // app
    ExpenseModule,

    // material
    MatCardModule,
    MatInputModule,
    MatButtonModule
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
    UserService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
