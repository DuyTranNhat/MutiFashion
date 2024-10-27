using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IVariantRepository : IRepository<Variant>
    {
        Task UpdateQuantityAsync(int variantID, int quantityDecreased);
    }
}
