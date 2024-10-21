using Microsoft.EntityFrameworkCore.Storage;
using Server.Data;
using Server.Dtos.Option;

namespace Server.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        ISupplierRepository Supplier { get; }
        IProductRepository Product { get; }
        IProductOptionRepository ProductOption { get; }
        IOptionRepository Option { get; }
        IValueRepository Value { get; }
        IVariantRepository Variant { get; }
        IVariantValueRepository VariantValue { get; }
        IImageRepository Image { get; }

        Task SaveAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
