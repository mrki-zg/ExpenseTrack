using System;

namespace ExpenseTrack.Web.Transfer
{
    public class Expense
    {
        public int UserId { get; set; }
        public string NameOfUser { get; set; }

        public int? ExpenseCategoryId { get; set; }
        public string ExpenseCategoryLabel { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double Value { get; set; }

        public DateTime Created { get; set; }
    }
}
