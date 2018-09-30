using ExpenseTrack.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrack.Data
{
    public class ExpenseTrackContext : DbContext
    {
        public ExpenseTrackContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<ExpenseEntry> ExpenseEntries { get; set; }

        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
    }
}