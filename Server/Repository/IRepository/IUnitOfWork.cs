using Microsoft.EntityFrameworkCore.Storage;
using Server.Data;
using Server.Dtos.Option;

namespace Server.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        ISupplierRepository Supplier { get; }
        IOptionRepository Option { get; }


        Task SaveAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
