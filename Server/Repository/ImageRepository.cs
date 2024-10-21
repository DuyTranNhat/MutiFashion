using Server.Data;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class ImageRepository : Repository<Image>, IImageRepository
    {
        private readonly MutiFashionContext _db;
        public ImageRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }
    }
}
