using Server.Dtos.Cart;
using Server.Dtos.Category;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IRefreshTokenRepository : IRepository<RefreshToken>
    {
        Task UpdateRevokedAsync(RefreshToken storedToken);
    }
}
