
using Server.Dtos.Slide;
using Server.Helper;

namespace Server.Service.IService
{
    public interface IBannerService
    {
        Task<SlideDto> CreateAsync(SlideRequestDto slideRequestDto);
        Task<object> DeleteAsync(int id);
        Task<QueryObject<SlideDto>> GetBannersAsync(int page, int limit);
        Task<SlideDto> GetByIdAsync(int id);
        Task<SlideDto?> ToggleActiveAsync(int id);
        Task<SlideDto?> UpdateAsync(int id, UpdateSlideDto slideDto);
    }
}
