using Server.Data;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class VariantValueRepository : Repository<VariantValue>, IVariantValueRepository
    {
        public VariantValueRepository(MutiFashionContext db) : base(db)
        {
        }
    }
}
