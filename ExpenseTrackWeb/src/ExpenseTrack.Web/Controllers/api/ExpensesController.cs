using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseTrack.Web.Repository;
using ExpenseTrack.Web.Transfer;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrack.Web.Controllers.api
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

        [HttpGet("single/{expenseEntryId}")]
        public async Task<IActionResult> GetExpense([FromRoute] int expenseEntryId)
        {
            var expense = await _expenseRepository.GetExpense(expenseEntryId);
            if (expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        [HttpPost]
        public async Task<IActionResult> PostExpense([FromBody] Expense expense)
        {
            if (string.IsNullOrEmpty(expense.Title))
            {
                return BadRequest();
            }

            var expenseEntryId = await _expenseRepository.AddExpenseAsync(expense);

            return CreatedAtAction("GetExpense", new { expenseEntryId }, expense);
        }
    }
}