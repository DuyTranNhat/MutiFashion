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
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(MutiFashionContext context, IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("uploadImage/{idProduct:int}")]
        public async Task<IActionResult> UploadImageProduct(IFormFile image, [FromRoute] int idProduct)
        {
            var result = await _productService.handleUploadAsync(idProduct, image);
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProductWithVariants([FromBody] CreateProductWithVariantsDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _productService.handleGenerateVariantAsync(dto);
            return Ok(result);
        }

    }
}
