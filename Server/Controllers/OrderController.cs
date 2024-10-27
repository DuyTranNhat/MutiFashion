using Server.Dtos.Order;
using Server.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Repository.IRepository;
using Server.Dtos.Paypal;
using Server.Models;

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

        //[HttpGet("getByID/{id:int}")]
        //[Authorize]
        //public async Task<IActionResult> GetCompletedOrderByID([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);
        //    try
        //    {
        //        var order = await _orderService.GetCompletedOrderByIDAsync(id);
        //        return Ok(order);
        //    }
        //    catch (BadHttpRequestException ex) {
        //        return BadRequest(ex.Message);
        //    }
        //}


        [Authorize]
        [HttpPost("Checkout/customerID/{idCustomer:int}")]
        public async Task<IActionResult> Checkout([FromRoute] int idCustomer,[FromBody] CreateOrderDto createOrderDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var orders = await _orderService.CreateOrderAsync(idCustomer, createOrderDto);
                return Ok(orders.OrderId);
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
                return Ok(response);
            }
            catch (Exception ex)
            {
                var error = new { ex.GetBaseException().Message };
                return BadRequest(error);
            }
        }
    }
}