using ecommerce_backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Option;
using Server.Dtos.Product;
using Server.Dtos.Supplier;
using Server.Models;
using Server.Service;
using Server.Service.IService;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VariantController : Controller
    {
        private readonly IVariantService _variantService;
        public VariantController(MutiFashionContext context, IVariantService variantService)
        {
            _variantService = variantService;
        }

        //[HttpPost("uploadImage/{idProduct:int}")]
        //public async Task<IActionResult> UploadImageProduct([FromForm]UploadRequestDto uploadDTO, [FromRoute] int idProduct)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);
        //    var result = await _productService.handleUploadAsync(idProduct, uploadDTO);
        //    return Ok(result);
        //}

        //[HttpPost("create")]
        //public async Task<IActionResult> CreateProductWithVariants([FromBody] CreateProductWithVariantsDto dto)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);
        //    var result = await _productService.handleGenerateVariantAsync(dto);
        //    return Ok(result);
        //}

        [HttpGet("GetVariants")]
        public async Task<IActionResult> GetVariants([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var result = await _variantService.GetVariantsAsync(page, limit);
            return Ok(result);
        }
    }
}
