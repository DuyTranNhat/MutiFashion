using Server.Dtos.Auth;
using Server.Models;

namespace Server.Service.IService
{
    public interface ITokenService
    {
        Task<TokenKit> GenerateToken(Customer user);
        Task<Customer?> InvalidateRefreshToken(int idUser);
        Task<TokenKit> RenewToken(TokenKit tokenKit);
    }
}
