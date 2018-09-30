using System.Collections.Generic;
using ExpenseTrack.Data.Model;

namespace ExpenseTrack.Web.Repository
{
    public interface IUserRepository
    {
        IList<User> GetAll();
    }
}