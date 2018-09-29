using System.Data.Entity;
using ExpenseTrack.Data.Model;

namespace ExpenseTrack.Data
{
    public class ExpenseTrackContext : DbContext
    {
        public ExpenseTrackContext() : base("expenseTrackEntities")
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<ExpenseEntry> ExpenseEntries { get; set; }

        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
    }
}