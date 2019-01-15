using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseTrack.Data.Model;

namespace ExpenseTrack.Web.Repository
{
    public interface IExpenseCategoryRepository
    {
        IEnumerable<ExpenseCategory> GetForUser(int? userId);

        Task<ExpenseCategory> GetExpenseCategoryForUser(string expenseCategoryLabel, int userId);
    }
}
