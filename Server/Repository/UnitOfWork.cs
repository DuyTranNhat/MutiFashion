using Microsoft.EntityFrameworkCore.Storage;
using Server.Data;
using Server.DataAccess.Repository;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly MutiFashionContext _db;
        private IDbContextTransaction _transaction;

        public ICartRepository Cart { get; }
        public IOrderRepository Order { get; }
        public IValueRepository Value { get; }
        public IImageRepository Image { get; }
        public IBannerRepository Banner { get; }
        public IOptionRepository Option { get; }
        public IVariantRepository Variant { get; }
        public IProductRepository Product { get; }
        public ICustomerRepository Customer { get; }
        public ISupplierRepository Supplier { get; }
        public ICategoryRepository Category { get; }
        public IOrderDetailRepository OrderDetail { get; }
        public IVariantValueRepository VariantValue { get; }
        public IProductOptionRepository ProductOption { get; }
        public IRefreshTokenRepository RefreshToken { get; }


        public UnitOfWork(MutiFashionContext db)
        {
            _db = db;
            Cart = new CartRepository(db);
            Order = new OrderRepository(db);
            Value = new ValueRepository(db);
            Image = new ImageRepository(db);
            Banner = new BannerRepository(db);
            Option = new OptionRepository(db);
            Product = new ProductRepository(db);
            Variant = new VariantRepository(db);
            Customer = new CustomerRepository(db);
            Supplier = new SupplierRepository(db);
            Category = new CategoryRepository(db);
            OrderDetail = new OrderDetailRepository(db);    
            VariantValue = new VariantValueRepository(db);
            ProductOption = new ProductOptionRepository(db);
            RefreshToken = new RefreshTokenRepository(db);
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
