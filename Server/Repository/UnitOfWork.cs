using Server.Data;
using Server.Interfaces;
using Server.Repository;

namespace Server.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MutiFashionContext _db;
        public ISupplierRepository Supplier { get; private set; }

        public UnitOfWork(MutiFashionContext db)
        {
            _db = db;
            Supplier = new SupplierRepository(db);
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
