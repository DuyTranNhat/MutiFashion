using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Slide;
using Server.Dtos.Supplier;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class BannerRepository : Repository<Slide>, IBannerRepository
    {
        private readonly MutiFashionContext _db;
        public BannerRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Slide?> UpdateAsync(int id, UpdateSlideDto obj, string result)
        {
            var slide = await _db.Slides.FirstOrDefaultAsync(s => s.SlideId == id);
            if (slide == null) return null;

            string newPath = result;
            slide.Image = newPath;
            slide.Title = obj.Title;
            slide.Link = obj.Link;
            slide.Description = obj.Description;
            return slide;
        }

        public async Task<Slide?> UpdateStatusAsync(int id)
        {
            var silde = await _db.Slides.Where(s => s.SlideId == id).FirstOrDefaultAsync();
            if (silde != null) silde.Status = !silde.Status;
            await _db.SaveChangesAsync();
            return silde;   
        }
    }
}
