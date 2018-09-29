using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTrack.Data.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string GivenName { get; set; }

        [Required]
        public string LegalName { get; set; }

        public IList<ExpenseCategory> ExpenseCategories { get; set; }

        public IList<ExpenseEntry> ExpenseEntries { get; set; }
    }
}