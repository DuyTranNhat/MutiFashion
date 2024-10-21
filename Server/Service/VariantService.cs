using Microsoft.AspNetCore.Http.HttpResults;
using Server.Exceptions;
using Server.Dtos.Product;
using Server.Exceptions;
using Server.Helper;
using Server.Mapper;
using Server.Models;
using Server.Repository;
using Server.Repository.IRepository;
using Server.Service.IService;

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
            var variantList = await _unitOfWork.Variant.GetAllAsync(includeProperties:
                "VariantValues.Value,VariantValues.ProductOption.Option,Images,Product");
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
    }
}
