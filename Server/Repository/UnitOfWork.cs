using Microsoft.EntityFrameworkCore.Storage;
using Server.Data;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly MutiFashionContext _db;
        private IDbContextTransaction _transaction;

        public ISupplierRepository Supplier { get; }
        public IOptionRepository Option { get; }
        public IProductRepository Product { get; }
        public IProductOptionRepository ProductOption { get; }
        public IValueRepository Value { get; }
        public IVariantRepository Variant { get; }
        public IVariantValueRepository VariantValue { get; }
        public IImageRepository Image { get; }

        public UnitOfWork(MutiFashionContext db)
        {
            _db = db;
            Value = new ValueRepository(db);
            Option = new OptionRepository(db);
            Product = new ProductRepository(db);
            Variant = new VariantRepository(db);
            Supplier = new SupplierRepository(db);
            ProductOption = new ProductOptionRepository(db);
            VariantValue = new VariantValueRepository(_db);
            Image = new ImageRepository(db);
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
