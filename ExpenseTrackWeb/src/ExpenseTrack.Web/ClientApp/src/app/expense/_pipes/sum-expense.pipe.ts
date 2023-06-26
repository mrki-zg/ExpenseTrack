import { Pipe, PipeTransform } from '@angular/core';

import { Expense } from '../_models/expense.model';

@Pipe({
  name: 'sumexpense'
})
export class SumExpensesPipe implements PipeTransform {

  transform(expenses: Expense[], args?: any): any {
    let total = 0;
    if (expenses) {
      expenses.forEach(expense => {
        total += expense.value;
      });
    }

    return total;
  }

}
