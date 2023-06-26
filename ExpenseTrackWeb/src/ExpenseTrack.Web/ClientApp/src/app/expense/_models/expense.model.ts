export class ExpenseCategory {
    expenseCategoryId: number;
    userId: number;
    name: string;
}

export class Expense {
    expenseEntryId: number;
    userId: number;
    nameOfUser: string;
    expenseCategoryId?: number;
    expenseCategoryLabel: string;
    title: string;
    description: string;
    value: number;
    created: Date
}
