import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    providers: [
        ExpenseService,
        ExpenseCategoriesService
    ]
})
export class ExpenseModule { }
