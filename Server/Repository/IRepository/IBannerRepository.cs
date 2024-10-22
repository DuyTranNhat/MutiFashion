using Server.Dtos.Slide;
using Server.Dtos.Supplier;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IBannerRepository : IRepository<Slide>
    {
        Task<Slide?> UpdateAsync(int id, UpdateSlideDto obj, string result);
        Task<Slide?> UpdateStatusAsync(int id);
    }
}
