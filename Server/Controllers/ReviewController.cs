using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Category;
using Server.Dtos.Review;
using Server.Dtos.Supplier;
using Server.Mapper;
using Server.Models;
using Server.Service;
using Server.Service.IService;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : Controller
    {
        private readonly IReviewService _reviewService;
        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreatedReviewDTO createdReview)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var supplierRS = await _reviewService.CreateAsync(createdReview);
            return Ok(supplierRS);
        }

        [HttpGet("get-review-by-product/{idPro:int}")]
        public async Task<IActionResult> GetReviewByProductAsync([FromRoute] int idPro, [FromQuery] int page, [FromQuery] int limit)
        {
            var result = await _reviewService.GetReviewByProductAsync(idPro, page, limit);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpGet("get-by-id/{id:int}")]
        public async Task<IActionResult> GetByID([FromRoute] int id)
        {
            var result = await _reviewService.getByIDAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
