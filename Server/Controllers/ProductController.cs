﻿using ecommerce_backend.Mappers;
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

        [HttpPost("search/")]
        public async Task<IActionResult> SearchByKey([FromBody] ProductSearchDto productSearch)
        {
            var result = await _productService.searchByKeyAsync(productSearch);
            return Ok(result);
        }

        [HttpPost("uploadImage/{idProduct:int}")]
        public async Task<IActionResult> UploadImageProduct([FromForm]UploadRequestDto uploadDTO, [FromRoute] int idProduct)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _productService.handleUploadAsync(idProduct, uploadDTO);
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProductWithVariants([FromBody] CreateProductWithVariantsDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _productService.handleGenerateVariantAsync(dto);
            return Ok(result);
        }

        [HttpGet("getProducts")]
        public async Task<IActionResult> GetProducts([FromQuery] int page = 1, [FromQuery] int limit = 12)
        {
            var result = await _productService.GetProductsAsync(page, limit);
            return Ok(result);
        }

        [HttpGet("getProductVariantsByID/{idProduct:int}")]
        public async Task<IActionResult> GetProductVariants([FromRoute] int idProduct)
        {
            var result = await _productService.GetProductVariantsAsync(idProduct);
            if (result == null) return NotFound("Product is not existed!");
            return Ok(result);
        }
    }
}
