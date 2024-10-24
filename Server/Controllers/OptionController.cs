using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Option;
using Server.Service.IService;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OptionController : Controller
    {
        private readonly IOptionService _optionService;
        public OptionController(IOptionService optionService) {
            _optionService = optionService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateOptionDto createOptionDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var optionRs = await _optionService.CreateAsync(createOptionDto);
            return CreatedAtRoute("getByID", new { idOption = optionRs.OptionID }, optionRs);
        }

        [HttpGet("GetOptions")]
        public async Task<IActionResult> GetOptions([FromQuery] int page = 1, 
                [FromQuery] int limit = 12, [FromQuery] bool isActive = false)
        {
            var optionRS = await _optionService.GetOptionsAsync(page, limit, isActive);
            return Ok(optionRS);
        }


        [HttpGet("GetByID/{idOption}", Name = "GetByID")]
        public async Task<IActionResult> GetById([FromRoute] int idOption)
        {
            var optionRS = await _optionService.GetByIDAsync(idOption);
            if (optionRS == null) return NotFound();
            return Ok(optionRS);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateOptionDto attributeDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var optionRS = await _optionService.UpdateAsync(id, attributeDto);
            if (optionRS == null) return NotFound("Attribute is not existed!");
            return CreatedAtRoute("getByID", new { idOption = optionRS.OptionID }, optionRS);
        }

        [HttpPut("updateStatus/{id}")]
        public async Task<IActionResult> ToggleFilter([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var optionRS = await _optionService.ToggleFilterAsync(id);
            if (optionRS == null) return NotFound();
            return Ok(new { message = "success" });
        }
    }
}
