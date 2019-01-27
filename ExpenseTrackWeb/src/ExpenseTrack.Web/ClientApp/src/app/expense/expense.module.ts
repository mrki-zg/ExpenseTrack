import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatIconModule, MatToolbarModule,
  MatCardModule, MatSidenavModule, MatListModule, MatButtonModule, MatTableModule, MatPaginatorModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { expenseRouting } from './expense.routing';

import { HomeComponent } from './home.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

import { SumExpensesPipe } from '../_pipes/sum-expense.pipe';

import { ExpenseService } from '../_services/expense.service';
import { ExpenseCategoriesService } from '../_services/expense-categories.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    expenseRouting,

    // material
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
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
  entryComponents: [
    ExpenseDetailComponent
  ],
  providers: [
    ExpenseService,
    ExpenseCategoriesService
  ]
})
export class ExpenseModule { }
