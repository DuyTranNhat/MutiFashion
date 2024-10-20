using Server.Data;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class VariantRepository : Repository<Variant>, IVariantRepository
    {
        public VariantRepository(MutiFashionContext db) : base(db)
        {
        }
    }
}
