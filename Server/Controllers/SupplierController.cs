using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Supplier;
using Server.Mapper;
using Server.Models;
using Server.Service;
using Server.Service.IService;

namespace Server.Controllers
{
    [ApiController]
    public class SupplierController : Controller
    {
        private readonly ISupplierService _supplierService;
        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }


        [HttpGet("getAll")] 
        public async Task<IActionResult> GetAll()
        {
            List<SupplierDto> SupplierList = await _supplierService.GetAllAsync();
            return Ok(SupplierList);
        }

        [HttpPut]
        [Route("updateStatus/{id:int}")]
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

        [HttpGet]
        [Route("getByID/{id:int}")]
        public async Task<IActionResult> GetByID([FromRoute] int id)
        {
            SupplierDto? supplierExisting = await _supplierService.getByIDAsync(id);
            if (supplierExisting == null)
                return NotFound();
            return Ok(supplierExisting);
        }

        [HttpPut]
        [Route("update/{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSupplierDtos supplierDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var supplierRS = await _supplierService.UpdateAsync(id, supplierDto);
            if (supplierRS == null)
                return NotFound();
            return Ok(supplierRS);
        }
    }
}
