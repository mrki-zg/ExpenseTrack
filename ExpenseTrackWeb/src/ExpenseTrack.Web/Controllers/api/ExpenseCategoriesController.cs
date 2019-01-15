using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ExpenseTrack.Data.Model;
using ExpenseTrack.Web.Repository;

namespace ExpenseTrack.Web.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseCategoriesController : ControllerBase
    {
        private readonly IExpenseCategoryRepository _expenseCategoryRepository;

        public ExpenseCategoriesController(IExpenseCategoryRepository expenseCategoryRepository)
        {
            _expenseCategoryRepository = expenseCategoryRepository;
        }

        [HttpGet("{userId}")]
        public IEnumerable<ExpenseCategory> GetCategories([FromRoute] int userId)
        {
            return _expenseCategoryRepository.GetForUser(userId);
        } 
    }
}