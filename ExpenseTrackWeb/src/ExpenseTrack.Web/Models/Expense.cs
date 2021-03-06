﻿using System;

namespace ExpenseTrack.Web.Models
{
    public class Expense
    {
        public int ExpenseEntryId { get; set; }

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
