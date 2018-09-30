using System.Collections.Generic;
using ExpenseTrack.Data.Model;
using ExpenseTrack.Web.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrack.Web.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("all")]
        public IList<User> GetAllUsers()
        {
            return _userRepository.GetAll();
        }
    }
}