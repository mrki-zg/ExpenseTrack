using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseTrack.Data.Model;

namespace ExpenseTrack.Web.Repository
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();

        Task<User> GetUserAsync(int id);

        Task<User> GetUserByUserNameAsync(string userName);

        Task<bool> UpdateUser(int id, User user);

        Task AddUser(User user);

        Task<User> DeleteUser(int id);
    }
}