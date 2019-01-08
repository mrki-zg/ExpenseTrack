using System;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTrack.Data.Model
{
    public class ExpenseEntry
    {
        public int ExpenseEntryId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int? ExpenseCategoryId { get; set; }
        public ExpenseCategory ExpenseCategory { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double Value { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateAdded { get; set; }
    }
}