﻿using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseTrack.Web.Models;
using ExpenseTrack.Web.Repository;
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

        [HttpDelete("{expenseEntryId}")]
        public async Task<IActionResult> DeleteExpense([FromRoute] int expenseEntryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var expense = await _expenseRepository.DeleteExpenseAsync(expenseEntryId);

            if (expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        [HttpPut("{expenseEntryId}")]
        public async Task<IActionResult> UpdateExpense([FromRoute] int expenseEntryId, [FromBody] Expense expense)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (expenseEntryId != expense.ExpenseEntryId)
            {
                return BadRequest();
            }

            var isUpdated = await _expenseRepository.UpdateExpenseAsync(expenseEntryId, expense);

            if (!isUpdated)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}