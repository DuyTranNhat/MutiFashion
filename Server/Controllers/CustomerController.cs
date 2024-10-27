using ecommerce_backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Service.IService;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;   
        }

        [HttpGet("GetById/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var customer = await _customerService.GetByIdAsync(id);
            if (customer == null) return NotFound("User is not existed!");
            return Ok(customer);
        }
    }
}
