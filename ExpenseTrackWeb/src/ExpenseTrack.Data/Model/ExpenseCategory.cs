using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTrack.Data.Model
{
    public class ExpenseCategory
    {
        [Key]
        public int ExpenseCategoryId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public string Name { get; set; }

        public IList<ExpenseEntry> ExpenseEntries { get; set; }
    }
}
