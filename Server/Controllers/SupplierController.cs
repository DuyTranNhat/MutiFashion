using Server.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Dtos.Supplier;
using Server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class SupplierController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public SupplierController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        //Get all Supplier 
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var SupplierList = await _unitOfWork.Supplier.GetAllAsync();
            return Ok(SupplierList);
        }

        //Create Supplier
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSupplierDto supplierDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Supplier supplierModel = supplierDto.ToSupplierFromCreateDto();

            await _unitOfWork.Supplier.AddAsync(supplierModel);
            _unitOfWork.Save();

            return Ok(supplierModel);
        }

        //Update Supplier 
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSupplierDtos supplierDto)
        {   
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // check containt Supplier 
            var supplierModel = await _unitOfWork.Supplier.Update(id, supplierDto);
            if (supplierModel == null)
            {
                return NotFound();
            }

            return Ok(supplierModel.ToSupplierDto());
        }

        //Hide Supplier(update Status of Supplier)
        [HttpPut]
        [Route("updateStatus/{id:int}")]
        public async Task<IActionResult> UpdateStatus([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // check containt Supplier 
            var existingSupplier = await _unitOfWork.Supplier.UpdateStatus(id);
            if (existingSupplier == null)
            {
                return NotFound();
            }

            return Ok(existingSupplier.ToSupplierDto());
        }

        [HttpGet]
        [Route("getByID/{id:int}")]
        public async Task<IActionResult> getByID([FromRoute] int id)
        {
            Supplier supplierExisting = await _unitOfWork.Supplier.GetAsync(c => c.SupplierId == id);

            if (supplierExisting == null)
            {
                return NotFound();    
            }

            return Ok(supplierExisting.ToSupplierDto());
        }
    }


}
