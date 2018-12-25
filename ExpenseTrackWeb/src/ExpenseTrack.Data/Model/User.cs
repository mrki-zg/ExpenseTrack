using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseTrack.Data.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string GivenName { get; set; }

        public string LegalName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        [NotMapped]
        public string Token { get; set; }

        public IList<ExpenseCategory> ExpenseCategories { get; set; }

        public IList<ExpenseEntry> ExpenseEntries { get; set; }
    }
}