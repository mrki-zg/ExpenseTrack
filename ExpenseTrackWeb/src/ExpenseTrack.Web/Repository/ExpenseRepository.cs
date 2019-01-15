using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTrack.Data;
using ExpenseTrack.Data.Model;
using ExpenseTrack.Web.Transfer;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrack.Web.Repository
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ExpenseTrackContext _dbContext;

        private readonly IExpenseCategoryRepository _expenseCategoryRepository;

        public ExpenseRepository(ExpenseTrackContext dbContext, IExpenseCategoryRepository expenseCategoryRepository)
        {
            _dbContext = dbContext;
            _expenseCategoryRepository = expenseCategoryRepository;
        }

        public IEnumerable<Expense> GetAll()
        {
            var query = from e in _dbContext.ExpenseEntries
                        join c in _dbContext.ExpenseCategories on e.ExpenseCategoryId equals c.ExpenseCategoryId
                        join u in _dbContext.Users on e.UserId equals u.UserId
                        select new Expense
                        {
                            ExpenseEntryId = e.ExpenseEntryId,
                            Description = e.Description,
                            UserId = e.UserId,
                            NameOfUser = $"{u.GivenName} {u.LegalName}",
                            ExpenseCategoryId = e.ExpenseCategoryId,
                            Title = e.Title,
                            Value = e.Value,
                            ExpenseCategoryLabel = c.Name,
                            Created = e.DateAdded
                        };
            return query.ToList();
        }

        public IEnumerable<Expense> GetAllForUser(int userId)
        {
            return _dbContext.ExpenseEntries.Where(ee => ee.UserId == userId).Select(ee => new Expense
            {
                ExpenseEntryId = ee.ExpenseEntryId,
                Description = ee.Description,
                UserId = ee.UserId,
                NameOfUser = $"{ee.User.GivenName} {ee.User.LegalName}",
                ExpenseCategoryId = ee.ExpenseCategoryId,
                Title = ee.Title,
                Value = ee.Value,
                ExpenseCategoryLabel = ee.ExpenseCategory.Name,
                Created = ee.DateAdded
            }).ToList();
        }

        public Task<Expense> GetExpense(int expenseEntryId)
        {
            return _dbContext.ExpenseEntries.Where(ee => ee.ExpenseEntryId == expenseEntryId).Select(ee => new Expense
            {
                ExpenseEntryId = ee.ExpenseEntryId,
                Description = ee.Description,
                UserId = ee.UserId,
                NameOfUser = $"{ee.User.GivenName} {ee.User.LegalName}",
                ExpenseCategoryId = ee.ExpenseCategoryId,
                Title = ee.Title,
                Value = ee.Value,
                ExpenseCategoryLabel = ee.ExpenseCategory.Name,
                Created = ee.DateAdded
            }).FirstOrDefaultAsync();
        }

        public async Task<int> AddExpenseAsync(Expense expense)
        {
            if (!string.IsNullOrEmpty(expense.ExpenseCategoryLabel))
            {
                var newExpenseCategory = await _expenseCategoryRepository.GetExpenseCategoryForUserAsync(expense.ExpenseCategoryLabel, expense.UserId);
                if (newExpenseCategory != null)
                {
                    expense.ExpenseCategoryId = newExpenseCategory.ExpenseCategoryId;
                }
            }

            var newExpenseEntry = new ExpenseEntry
            {
                UserId = expense.UserId,
                DateAdded = DateTime.Now,
                Description = expense.Description,
                Title = expense.Title,
                ExpenseCategoryId = expense.ExpenseCategoryId,
                Value = expense.Value
            };
            _dbContext.ExpenseEntries.Add(newExpenseEntry);

            await _dbContext.SaveChangesAsync();
            return newExpenseEntry.ExpenseEntryId;
        }

        public async Task<Expense> DeleteExpenseAsync(int expenseEntryId)
        {
            var expense = await GetExpense(expenseEntryId);
            if (expense != null)
            {
                var expenseEntry = await _dbContext.ExpenseEntries.FirstOrDefaultAsync(ee => ee.ExpenseEntryId == expenseEntryId);
                if (expenseEntry != null)
                {
                    _dbContext.ExpenseEntries.Remove(expenseEntry);
                    await _dbContext.SaveChangesAsync();
                }
            }

            return expense;
        }
    }
}
