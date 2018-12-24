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
        }
    }
}