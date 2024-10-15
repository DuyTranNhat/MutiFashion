using Microsoft.EntityFrameworkCore.Storage;
using Server.Data;
using Server.Repository.IRepository;
using Server.Service;

namespace Server.Repository
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly MutiFashionContext _db;
        private IDbContextTransaction _transaction;

        public ISupplierRepository Supplier { get; }

        public UnitOfWork(MutiFashionContext db)
        {
            _db = db;
            Supplier = new SupplierRepository(_db);
        }
       
        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }


        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            _transaction = await _db.Database.BeginTransactionAsync();
            return _transaction;
        }



        public async Task CommitAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
            }
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
            }
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _db.Dispose();
        }
    }
}
