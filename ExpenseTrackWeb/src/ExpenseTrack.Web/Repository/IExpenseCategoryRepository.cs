using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseTrack.Data.Model;

namespace ExpenseTrack.Web.Repository
{
    public interface IExpenseCategoryRepository
    {
        IEnumerable<ExpenseCategory> GetForUser(int? userId);

        Task<ExpenseCategory> GetExpenseCategoryForUserAsync(string expenseCategoryLabel, int userId);

        Task<ExpenseCategory> DeleteExpenseCategoryAsync(int expenseCategoryId, bool saveChanges = true);
    }
}
