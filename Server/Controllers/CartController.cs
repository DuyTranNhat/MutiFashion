using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Repository.IRepository;
using Server.Mappers;
using Server.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Cart;
using Server.Exceptions;

namespace Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Cart")]
    public class CartController : Controller
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("getCartsUser/{idUser:int}")]
        [Authorize]
        public async Task<IActionResult> GetCartByUser([FromRoute] int idUser,
                 [FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _cartService.GetCartByUserAsync(idUser, page, limit);
            return Ok(result);
        }

        [HttpPost("addItemToCart")]
        public async Task<IActionResult> AddItemToCart([FromBody] CreateCartDto cartDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var result = await _cartService.AddItemAsync(cartDto);
                return Ok(result.CartId);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (BadHttpRequestException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", details = ex.Message });
            }
        }

        [HttpDelete("removeCartItem/{id:int}")]
        public async Task<IActionResult> Remove([FromRoute] int id)
        {
            var result = await _cartService.RemoveItemAsync(id);
            return Ok(new { message = "Remove successfully" });
        }

        [HttpPost("increaseQuantity/{cartId:int}")]
        public async Task<IActionResult> IncreaseQuantity([FromRoute] int cartId)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                await _cartService.IncreaseQuantityAsync(cartId);
                return Ok();
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (BadHttpRequestException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", details = ex.Message });
            }
        }

        [HttpPost("decreaseQuantity/{cartId:int}")]
        public async Task<IActionResult> DecreaseQuantity([FromRoute] int cartId)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                await _cartService.DecreaseQuantityAsync(cartId);
                return Ok();
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (BadHttpRequestException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", details = ex.Message });
            }

        }
    }
}