using System.Collections.Generic;
using ExpenseTrack.Data.Model;
using ExpenseTrack.Web.Repository;
using ExpenseTrack.Web.Transfer;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrack.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpensesController(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        [HttpGet]
        public IEnumerable<Expense> GetAll()
        {
            return _expenseRepository.GetAll();
        }

        [HttpGet("{userId}")]
        public IEnumerable<Expense> GetAllForUser([FromRoute] int userId)
        {
            return _expenseRepository.GetAllForUser(userId);
        }
    }
}