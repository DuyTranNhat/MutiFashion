using Microsoft.AspNetCore.Http.HttpResults;
using Server.Exceptions;
using Server.Dtos.Product;
using Server.Helper;
using Server.Mapper;
using Server.Models;
using Server.Repository.IRepository;
using Server.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace Server.Service
{
    public class VariantService : IVariantService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;
        public VariantService(IUnitOfWork unitOfWork, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }

        public async Task<QueryObject<VariantDto>> FilterVariantsAsync(VariantFilterDto filterRequest, int page, int limit)
        {
            var variants = await _unitOfWork.Variant.GetAllAsync(includeProperties: "VariantValues.Value," +
                "VariantValues.ProductOption.Option.Values,Product.Category,Product.Supplier,Images");

            var variantsQuery = variants.AsQueryable().AsNoTracking();

            if (filterRequest.SupplierID != null)
                variantsQuery = variantsQuery.Where(v => v.Product.SupplierId == filterRequest.SupplierID);

            if (filterRequest.CategoryID != null)
                variantsQuery = variantsQuery.Where(v => v.Product.CategoryId == filterRequest.CategoryID);

            if (!string.IsNullOrWhiteSpace(filterRequest.keyWord))
                variantsQuery = variantsQuery.Where(v => v.Product.Name.
                ToLower().Contains(filterRequest.keyWord.ToLower()));

            if (!string.IsNullOrWhiteSpace(filterRequest.SkuId))
                variantsQuery = variantsQuery.Where(v => v.SkuId.Contains(filterRequest.SkuId));

            if (filterRequest.FromPrice != null)
                variantsQuery = variantsQuery.Where(v => v.SalePrice >= filterRequest.FromPrice);

            if (filterRequest.ToPrice != null)
                variantsQuery = variantsQuery.Where(v => v.SalePrice <= filterRequest.ToPrice);

            var variantsDTO = variantsQuery.Select(v => v.ToVariantDto()).FilterPage(page, limit);
            return variantsDTO;
        }



        public async Task<object> DeleteImageByIDVarAsync(int imageId)
        {
            var imageExisting = await _unitOfWork.Image.GetAsync(i => i.ImageId == imageId);
            if (imageExisting == null) return null;
            _imageService.SetDirect("images/variants");
            _imageService.DeleteOldImage(imageExisting.ImageUrl);
            await _unitOfWork.Image.RemoveAsync(imageExisting); 
            await _unitOfWork.SaveAsync();
            return new { message = "Delete successfully" };

        }
        
        public async Task<IEnumerable<VariantImageDto>> getImagesByIDVariantAsync(int variantID)
        {
            var variantExisting = await _unitOfWork.Variant.GetAsync(v => v.VariantId == variantID)
                ?? throw new NotFoundException("Variant not found!");

            var images = await _unitOfWork.Image.GetAllAsync(i =>
                            i.VariantId == variantExisting.VariantId);

            var imageDtos = images.Select(img => img.ToVariantImageDto());
            return imageDtos;
        }

        public async Task<QueryObject<VariantDto>> GetVariantsAsync(int page, int limit)
        {
            var variantList = await _unitOfWork.Variant.GetAllAsync(includeProperties: "VariantValues." +
                "Value,VariantValues.ProductOption.Option,Images,Product.Category,Product.Supplier");
            var variantDTO = variantList.Select(v => v.ToVariantDto()).
                AsQueryable().FilterPage(page, limit);
            return variantDTO;
        }

        public async Task<IEnumerable<Image>> UploadListImgAsync(UploadListRequestDto imageRequest, int variantID)
        {
            if (imageRequest.fileImages == null || imageRequest.fileImages.Count == 0)
                throw new BadHttpRequestException("Please choose at least one image");

            var variant = _unitOfWork.Variant.GetAsync(v => v.VariantId == variantID)
                ?? throw new NotFoundException("Please choose at least one image");

            foreach (var file in imageRequest.fileImages)
            {
                // Upload each image and get the URL
                var imageUrl = await _imageService.HandleImageUploadAsync(file!);
                await _unitOfWork.Image.AddAsync(new Image
                {
                    ImageUrl = imageUrl,
                    VariantId = variantID
                });
            }
            await _unitOfWork.SaveAsync();
            var reponseData = await _unitOfWork.Image.
                GetAllAsync(i => i.VariantId == variantID);
            return reponseData;
        }

        public async Task DecreaseQuantityAsync(int variantID, int quantityDecreased)
        {
            var variant = await _unitOfWork.Variant.GetAsync(v => v.VariantId == variantID)
                ?? throw new NotFoundException("Variant Not Found");

            if (variant.Quantity < quantityDecreased)
                throw new BadHttpRequestException("Cannot provide enough quantity, Please choose proper ones!");

            await _unitOfWork.Variant.UpdateQuantityAsync(variantID, quantityDecreased);
        }

        public async Task<VariantUpdateDto> GetUpdatedVariant(int variantID)
        {
            var variantUpdated = await _unitOfWork.Variant.GetAsync(v 
                => v.VariantId == variantID, includeProperties: "Product");
            if (variantUpdated == null) return null;
            return variantUpdated.ToVariantUpdatedDto();
        }
        public async Task<bool> UpdateVariantAsync(VariantUpdateDto updatedVariant)
        {
            var variant = await _unitOfWork.Variant.GetAsync(c => c.VariantId == updatedVariant.VariantId);

            if (variant == null) return false;

            await _unitOfWork.Variant.UpdateAsync(updatedVariant);
            await _unitOfWork.SaveAsync();
            return true;
        }
    }
}
