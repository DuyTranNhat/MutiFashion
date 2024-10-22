using Server.Repository.IRepository;
using Server.Mappers;
using Server.Service;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Slide;
using Server.Service.IService;
using System.Reflection;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BannerController : Controller
    {
        private readonly IBannerService _bannerService;

        public BannerController(IBannerService bannerService)
        {
            _bannerService = bannerService;
        }

        [HttpPut]
        [Route("updateStatus/{id:int}")]
        public async Task<IActionResult> UpdateStatus([FromRoute] int id)
        {
            var result = await _bannerService.ToggleActiveAsync(id);
            if (result == null) return NotFound("Banner is not existed");
            return Ok(result);
        }

        [HttpPost("createBanner")]
        public async Task<IActionResult> Create([FromForm] SlideRequestDto slideRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _bannerService.CreateAsync(slideRequestDto);
            return CreatedAtAction(nameof(GetById), new { id = result.SlideId }, result);
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateSlideDto slideDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _bannerService.UpdateAsync(id, slideDto);
            if (result == null) return NotFound("Banner is not existed");
            return CreatedAtAction(nameof(GetById), new { id = result.SlideId }, result);
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _bannerService.GetByIdAsync(id);
            if (result == null) return NotFound("Banner is not existed");
            return Ok(result);
        }

        [HttpGet("GetBanners")]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, int limit = 12)
        {
            var result = await _bannerService.GetBannersAsync(page, limit);
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _bannerService.DeleteAsync(id);
            if (result == null) return NotFound("Banner is not existed!");
            return NoContent();
        }
    }
}
