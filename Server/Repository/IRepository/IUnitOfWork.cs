using Microsoft.EntityFrameworkCore.Storage;
using Server.Data;
using Server.Dtos.Option;

namespace Server.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        ICartRepository Cart { get; }
        IValueRepository Value { get; }
        IImageRepository Image { get; }
        IBannerRepository Banner { get; }
        IOptionRepository Option { get; }
        IProductRepository Product { get; }
        IVariantRepository Variant { get; }
        ISupplierRepository Supplier { get; }
        ICustomerRepository Customer { get; }
        ICategoryRepository Category { get; }
        IRefreshTokenRepository RefreshToken { get; }
        IVariantValueRepository VariantValue { get; }
        IProductOptionRepository ProductOption { get; }

        Task SaveAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
