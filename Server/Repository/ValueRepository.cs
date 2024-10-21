using Server.Data;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class ValueRepository : Repository<Value>, IValueRepository
    {
        public ValueRepository(MutiFashionContext db) : base(db)
        {
        }
    }
}
