using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTrack.Data;
using ExpenseTrack.Data.Model;
using ExpenseTrack.Web.Util;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrack.Web.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ExpenseTrackContext _dbContext;

        public UserRepository(ExpenseTrackContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> GetAll()
        {
            return _dbContext.Users.ToList();
        }

        public Task<User> GetUserAsync(int id)
        {
            return _dbContext.Users.FindAsync(id);
        }

        public Task<User> GetUserByUserNameAsync(string userName)
        {
            return _dbContext.Users.SingleOrDefaultAsync(u => u.UserName == userName);
        }

        public async Task<bool> UpdateUser(int id, User user)
        {
            user.Password = PasswordHelper.HashPassword(user.Password);
            _dbContext.Entry(user).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return false;
                }

                throw;
            }

            return true;
        }

        public async Task AddUser(User user)
        {
            user.Password = PasswordHelper.HashPassword(user.Password);
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> DeleteUser(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _dbContext.Users.Any(e => e.UserId == id);
        }
    }
}