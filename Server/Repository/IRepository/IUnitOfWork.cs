using Microsoft.EntityFrameworkCore.Storage;
using Server.Data;

namespace Server.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        ISupplierRepository Supplier { get; }


        Task SaveAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
