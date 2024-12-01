using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using Server.Service.IService;
using Server.Models;
using Server.Repository.IRepository;
using Server.Repository;
using Server.Dtos.Slide;
using Server.Mappers;
using Server.Mapper;
using Server.Helper;

namespace Server.Service
{
    public class BannerService : IBannerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;
        public BannerService(IUnitOfWork unitOfWork, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }

        public async Task<SlideDto> CreateAsync(SlideRequestDto slideRequestDto)
        {
            string imageUrl = null;
            if (slideRequestDto.ImageFile != null)
            {
                await _imageService.SetDirect("images/slides");
                imageUrl = await _imageService.HandleImageUploadAsync(slideRequestDto.ImageFile);
            }

            var newSlide = slideRequestDto.ToBannerFromCreate(imageUrl);
            await _unitOfWork.Banner.AddAsync(newSlide);
            await _unitOfWork.SaveAsync();
            return newSlide.ToBannerDto();
        }

        public async Task<object> DeleteAsync(int id)
        {
            var existingSlide = await _unitOfWork.Banner.GetAsync(s => s.SlideId == id);
            if (existingSlide == null) return null;

            _imageService.DeleteOldImage(existingSlide.Image);
            await _unitOfWork.Banner.RemoveAsync(existingSlide);
            await _unitOfWork.SaveAsync();
            return new { messsage = "Delete successfully!" };
        }

        public async Task<QueryObject<SlideDto>> GetBannersAsync(int page, int limit)
        {
            var banners = await _unitOfWork.Banner.GetAllAsync(b => b.Status == true);
            var bannersDto = banners.Select(b => b.ToBannerDto()).FilterPage(page, limit);
            return bannersDto;
        }

        public async Task<SlideDto> GetByIdAsync(int id)
        {
            var banner = await _unitOfWork.Banner.GetAsync(s => s.SlideId == id);
            if (banner == null) return null;
            return banner.ToBannerDto();
        }

        public async Task<SlideDto?> ToggleActiveAsync(int id)
        {
            var banner = await _unitOfWork.Banner.UpdateStatusAsync(id);
            if (banner == null) return null;
            return banner.ToBannerDto();
        }

        public async Task<SlideDto?> UpdateAsync(int id, UpdateSlideDto slideDto)
        {
            var existingSlide = await _unitOfWork.Banner.GetAsync(s => s.SlideId == id);
            if (existingSlide == null) return null;

            string imageUrl = existingSlide.Image;
            if (slideDto.ImageFile != null)
            {
                _imageService.SetDirect("images/slides");
                imageUrl = await _imageService.HandleImageUploadAsync(slideDto.ImageFile);
                _imageService.DeleteOldImage(existingSlide.Image);
            }

            var result = await _unitOfWork.Banner.UpdateAsync(id, slideDto, imageUrl);
            await _unitOfWork.SaveAsync();
            return result.ToBannerDto();
        }
    }
}