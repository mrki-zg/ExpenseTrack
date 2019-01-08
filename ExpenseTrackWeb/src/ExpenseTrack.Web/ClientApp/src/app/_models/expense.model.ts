import { User } from "./user.model";

export class ExpenseCategory {
    expenseCategoryId: number;
    userId: number;
    name: string;
}

export class Expense {
    userId: number;
    nameOfUser: string;
    expenseCategoryId?: number;
    expenseCategoryLabel: string;
    title: string;
    description: string;
    value: number;
    created: Date
}