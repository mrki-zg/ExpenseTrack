﻿// <auto-generated />
using System;
using ExpenseTrack.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ExpenseTrack.Data.Migrations
{
    [DbContext(typeof(ExpenseTrackContext))]
    [Migration("20180930012446_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ExpenseTrack.Data.Model.ExpenseCategory", b =>
                {
                    b.Property<int>("ExpenseCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int>("UserId");

                    b.HasKey("ExpenseCategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("ExpenseCategories");
                });

            modelBuilder.Entity("ExpenseTrack.Data.Model.ExpenseEntry", b =>
                {
                    b.Property<int>("ExpenseEntryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<int?>("ExpenseCategoryId");

                    b.Property<string>("Title");

                    b.Property<int>("UserId");

                    b.Property<double>("Value");

                    b.HasKey("ExpenseEntryId");

                    b.HasIndex("ExpenseCategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("ExpenseEntries");
                });

            modelBuilder.Entity("ExpenseTrack.Data.Model.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("GivenName")
                        .IsRequired();

                    b.Property<string>("LegalName")
                        .IsRequired();

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ExpenseTrack.Data.Model.ExpenseCategory", b =>
                {
                    b.HasOne("ExpenseTrack.Data.Model.User", "User")
                        .WithMany("ExpenseCategories")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ExpenseTrack.Data.Model.ExpenseEntry", b =>
                {
                    b.HasOne("ExpenseTrack.Data.Model.ExpenseCategory", "ExpenseCategory")
                        .WithMany("ExpenseEntries")
                        .HasForeignKey("ExpenseCategoryId");

                    b.HasOne("ExpenseTrack.Data.Model.User", "User")
                        .WithMany("ExpenseEntries")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
