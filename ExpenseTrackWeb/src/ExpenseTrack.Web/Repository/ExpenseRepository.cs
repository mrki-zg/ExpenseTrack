using System.Collections.Generic;
using System.Linq;
using ExpenseTrack.Data;
using ExpenseTrack.Data.Model;
using ExpenseTrack.Web.Transfer;

namespace ExpenseTrack.Web.Repository
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ExpenseTrackContext _dbContext;

        public ExpenseRepository(ExpenseTrackContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Expense> GetAll()
        {
            var query = from e in _dbContext.ExpenseEntries
                        join c in _dbContext.ExpenseCategories on e.ExpenseCategoryId equals c.ExpenseCategoryId
                        join u in _dbContext.Users on e.UserId equals u.UserId
                        select new Expense
                        {
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
    }
}
