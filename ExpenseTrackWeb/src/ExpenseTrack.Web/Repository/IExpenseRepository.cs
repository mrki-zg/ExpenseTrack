﻿using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseTrack.Data.Model;
using ExpenseTrack.Web.Models;

namespace ExpenseTrack.Web.Repository
{
    public interface IExpenseRepository
    {
        IEnumerable<Expense> GetAll();

        IEnumerable<Expense> GetAllForUser(int userId);

        Task<Expense> GetExpense(int expenseEntryId);

        Task<int> AddExpenseAsync(Expense expense);

        Task<Expense> DeleteExpenseAsync(int expenseEntryId);

        Task<bool> UpdateExpenseAsync(int expenseEntryId, Expense expense);
    }
}