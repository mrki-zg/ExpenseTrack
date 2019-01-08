using System.Collections.Generic;
using ExpenseTrack.Data.Model;
using ExpenseTrack.Web.Transfer;

namespace ExpenseTrack.Web.Repository
{
    public interface IExpenseRepository
    {
        IEnumerable<Expense> GetAll();

        IEnumerable<Expense> GetAllForUser(int userId);
    }
}