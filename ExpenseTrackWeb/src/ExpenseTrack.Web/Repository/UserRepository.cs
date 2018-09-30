using System.Collections.Generic;
using System.Linq;
using ExpenseTrack.Data;
using ExpenseTrack.Data.Model;

namespace ExpenseTrack.Web.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ExpenseTrackContext _dbContext;

        public UserRepository(ExpenseTrackContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IList<User> GetAll()
        {
            return _dbContext.Users.ToList();
        }
    }
}