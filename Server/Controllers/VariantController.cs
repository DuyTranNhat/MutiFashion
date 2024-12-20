﻿using ecommerce_backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Option;
using Server.Dtos.Product;
using Server.Dtos.Supplier;
using Server.Exceptions;
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

        [HttpPost("filterVariants")]
        public async Task<IActionResult> FilterVariants([FromBody] VariantFilterDto
                    filterRequest, [FromQuery] int page = 1, [FromQuery] int limit = 12)
        {
            var result = await _variantService.FilterVariantsAsync(filterRequest, page, limit);
            return Ok(result);
        }

        [HttpPost("uploadListImages/{variantID:int}")]
        public async Task<IActionResult> UploadImages([FromForm] UploadListRequestDto imageRequest, [FromRoute] int variantID)
        {
            try
            {
                var reponsedata = await _variantService.UploadListImgAsync(imageRequest, variantID);
                return Ok(reponsedata);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getListImage/{variantID:int}")]
        public async Task<IActionResult> GetImagesByVariantId([FromRoute] int variantID)
        {
            try
            {
                var imagesRS = await _variantService.getImagesByIDVariantAsync(variantID);
                return Ok(imagesRS);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateVariant([FromBody] VariantUpdateDto updatedVariant)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _variantService.UpdateVariantAsync(updatedVariant);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpGet("get-updated-variant/{variantID:int}")]
        public async Task<IActionResult> GetUpdatedVariant([FromRoute] int variantID)
        {
            try
            {
                var result = await _variantService.GetUpdatedVariant(variantID);
                if (result == null) return null;
                return Ok(result);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteImageVariant/{imageId}")]
        public async Task<IActionResult> DeleteImage([FromRoute] int imageId)
        {
            var result = await _variantService.DeleteImageByIDVarAsync(imageId);
            if (result == null) return NotFound("Image is not existed!");
            return NoContent();
        }

        [HttpGet("GetVariants")]
        public async Task<IActionResult> GetVariants([FromQuery] int page = 1, [FromQuery] int limit = 12)
        {
            var result = await _variantService.GetVariantsAsync(page, limit);
            return Ok(result);
        }

    }
}
