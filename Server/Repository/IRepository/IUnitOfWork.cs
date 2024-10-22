﻿using Microsoft.EntityFrameworkCore.Storage;
using Server.Data;
using Server.Dtos.Option;

namespace Server.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IValueRepository Value { get; }
        IImageRepository Image { get; }
        IBannerRepository Banner { get; }
        IOptionRepository Option { get; }
        IProductRepository Product { get; }
        IVariantRepository Variant { get; }
        ISupplierRepository Supplier { get; }
        ICategoryRepository Category { get; }
        IVariantValueRepository VariantValue { get; }
        IProductOptionRepository ProductOption { get; }

        Task SaveAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
