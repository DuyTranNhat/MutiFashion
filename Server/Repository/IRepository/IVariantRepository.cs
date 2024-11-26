using Server.Dtos.Product;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IVariantRepository : IRepository<Variant>
    {
        Task UpdateAsync(VariantUpdateDto updatedVariant);
        Task UpdateQuantityAsync(int variantID, int quantityDecreased);
    }
}
