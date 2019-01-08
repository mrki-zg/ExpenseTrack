using System;
using ExpenseTrack.Data;
using ExpenseTrack.Data.Model;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.DependencyInjection;

namespace ExpenseTrack.Web.Util
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ExpenseTrackContext>();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                context.Users.Add(new User
                {
                    GivenName = "Test",
                    LegalName = "User",
                    UserName = "test",
                    Password = PasswordHelper.HashPassword("test")

                });
                context.Users.Add(new User
                {
                    GivenName = "Robert",
                    LegalName = "Mrkonjic",
                    UserName = "admin",
                    Password = PasswordHelper.HashPassword("R091189mrki")

                });
                context.SaveChanges();
            }

            if (!context.ExpenseCategories.Any())
            {
                context.ExpenseCategories.Add(new ExpenseCategory
                {
                    Name = "Food",
                    UserId = 1
                });

                context.ExpenseCategories.Add(new ExpenseCategory
                {
                    Name = "Living",
                    UserId = 2
                });

                context.SaveChanges();
            }

            if (!context.ExpenseEntries.Any())
            {
                context.ExpenseEntries.Add(new ExpenseEntry
                {
                    Title = "Weekend shopping",
                    Description = "The weekly shopping groceries shopping",
                    UserId = 1,
                    ExpenseCategoryId = 1,
                    Value = 60,
                    DateAdded = DateTime.Now.Subtract(new TimeSpan(2, 0, 0, 0))
                });

                context.ExpenseEntries.Add(new ExpenseEntry
                {
                    Title = "Rent",
                    Description = "The monthly rent",
                    UserId = 1,
                    ExpenseCategoryId = 2,
                    Value = 650,
                    DateAdded = DateTime.Now.Subtract(new TimeSpan(7, 0, 0, 0))
                });

                context.ExpenseEntries.Add(new ExpenseEntry
                {
                    Title = "Gas & Electricity",
                    Description = "The monthly gas and electricity costs",
                    UserId = 1,
                    ExpenseCategoryId = 2,
                    Value = 90,
                    DateAdded = DateTime.Now.Subtract(new TimeSpan(6, 0, 0, 0))
                });

                context.SaveChanges();
            }
        }
    }
}