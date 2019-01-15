using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTrack.Data;
using ExpenseTrack.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrack.Web.Repository
{
    public class ExpenseCategoryRepository : IExpenseCategoryRepository
    {
        private readonly ExpenseTrackContext _dbContext;

        public ExpenseCategoryRepository(ExpenseTrackContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<ExpenseCategory> GetForUser(int? userId)
        {
            return userId.HasValue
                ? _dbContext.ExpenseCategories.Where(ec => ec.UserId == userId).ToList()
                : _dbContext.ExpenseCategories.ToList();
        }

        public async Task<ExpenseCategory> GetExpenseCategoryForUserAsync(string expenseCategoryLabel, int userId)
        {
            ExpenseCategory expenseCategory = null;

            var categoryExists = await ExistsAsync(expenseCategoryLabel, userId);
            if (!categoryExists)
            {
                expenseCategory = new ExpenseCategory
                {
                    UserId = userId,
                    Name = expenseCategoryLabel
                };
                _dbContext.ExpenseCategories.Add(expenseCategory);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                expenseCategory = await _dbContext.ExpenseCategories.FirstOrDefaultAsync(ec => ec.Name == expenseCategoryLabel && ec.UserId == userId);
            }

            return expenseCategory;
        }

        public async Task<ExpenseCategory> DeleteExpenseCategoryAsync(int expenseCategoryId, bool saveChanges = true)
        {
            var expenseCategory = await _dbContext.ExpenseCategories.FirstOrDefaultAsync(ec => ec.ExpenseCategoryId == expenseCategoryId);
            if (expenseCategory != null)
            {
                _dbContext.ExpenseCategories.Remove(expenseCategory);
                if (saveChanges)
                {
                    await _dbContext.SaveChangesAsync();
                }
            }

            return expenseCategory;
        }

        private Task<bool> ExistsAsync(string categoryLabel, int userId)
        {
            return _dbContext.ExpenseCategories.AnyAsync(ec => ec.Name == categoryLabel && ec.UserId == userId);
        }
    }
}
