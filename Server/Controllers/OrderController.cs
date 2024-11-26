using Server.Dtos.Order;
using Server.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Repository.IRepository;
using Server.Dtos.Paypal;
using Server.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Update.Internal;
using ecommerce_backend.Dtos.Order;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly IPaypalService _paypalService;
        private readonly IUnitOfWork _unitOfWork;
        public OrderController(IUnitOfWork unitOfWork, IOrderService orderService, ICartService
            cartService, IPaypalService paypalService
            )
        {
            _paypalService = paypalService;
            _orderService = orderService;
            _unitOfWork = unitOfWork;
        }

        [Authorize]
        [HttpPost("Checkout/customerID/{idCustomer:int}")]
        public async Task<IActionResult> CheckoutCOD([FromRoute] int idCustomer,[FromBody] CreateOrderDto createOrderDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var orders = await _orderService.CreateOrderAsync(idCustomer, createOrderDto);
                return Ok(orders);
            }
            catch (BadHttpRequestException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost("checkout/create-paypal-order/{idUser:int}")]
        public async Task<IActionResult> CreatePaypalOrder([FromRoute] int idUser, CancellationToken cancellationToken)
        {

            try
            {
                var response = await _paypalService.CreateOrderAsync(idUser);

                return Ok(response);
            }
            catch (Exception ex)
            {
                var error = new { ex.GetBaseException().Message };
                return BadRequest(error);
            }
        }

        [HttpPost("checkout/capture-paypal-order/{orderId}/user/{idUser:int}")]
        public async Task<IActionResult> CapturePaypalOrder([FromRoute] int idUser, string orderID, CancellationToken 
                cancellationToken, [FromBody] CreateOrderDto createOrderRequest)
        {
            try
            {
                var response = await _paypalService.CaptureOrder(orderID);
                var orders = await _orderService.CreateOrderAsync(idUser, createOrderRequest);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                var error = new { ex.GetBaseException().Message };
                return BadRequest(error);
            }
        }

        [HttpGet("getByID/{id:int}")]
        public async Task<IActionResult> GetCompletedOrderByID([FromRoute] int id)
        {
            try
            {
                var order = await _orderService.GetCompletedOrderByIDAsync(id);
                return Ok(order);
            }
            catch (BadHttpRequestException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getOrdersBycus")]
        public async Task<IActionResult> GetOrdersByCus([FromQuery] int page = 1, [FromQuery] int limit = 12)
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID kh�ng t?n t?i trong token.");

            var result = await _orderService.GetOrdersByCusAsync(userId, page, limit);
            return Ok(result);
        }

        [HttpGet("getOrders")]
        public async Task<IActionResult> GetOrders([FromQuery] int page = 1, [FromQuery] int limit = 12)
        {
            var result = await _orderService.GetOrdersAsync(page, limit);
            return Ok(result);
        }

        [HttpPut("update-status-order/{orderID}")]
        public async Task<IActionResult> UpdateStatus([FromRoute] int orderID, [FromBody] UpdateStatusDto UpdateStatus)
        {

            try
            {
                var response = await _orderService.UpdateStatusAsync(orderID, UpdateStatus);
                if (!response) return NotFound();
                return NoContent();
            }
            catch (Exception ex)
            {
                var error = new { ex.GetBaseException().Message };
                return BadRequest(error);
            }
        }
    }
}