using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Category;
using Server.Dtos.Supplier;
using Server.Mapper;
using Server.Models;
using Server.Service;
using Server.Service.IService;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : Controller
    {
        private readonly ISupplierService _supplierService;
        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }


        [HttpGet("GetSuppliers")] 
        public async Task<IActionResult> GetSuppliers([FromQuery] int page = 1, [FromQuery] int limit = 12)
        {
            var SupplierList = await _supplierService.GetAllAsync(page, limit);
            return Ok(SupplierList);
        }

        [HttpPut("updateStatus/{id:int}")]
        public async Task<IActionResult> UpdateStatus([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var supllierRS = await _supplierService.UpdateStatusAsync(id);
            if (supllierRS == null)
                return NotFound();
            return Ok(supllierRS);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateSupplierDto supplierDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var supplierRS = await _supplierService.CreateAsync(supplierDto);
            return Ok(supplierRS);
        }

        [HttpGet("getByID/{id:int}")]
        public async Task<IActionResult> GetByID([FromRoute] int id)
        {
            SupplierDto? supplierExisting = await _supplierService.getByIDAsync(id);
            if (supplierExisting == null)
                return NotFound();
            return Ok(supplierExisting);
        }


        
        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSupplierDto supplierUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryRS = await _supplierService.UpdateAsync(id, supplierUpdateDto);
            if (categoryRS == null)
                return NotFound();
            return Ok(categoryRS);
        }
    }
}
