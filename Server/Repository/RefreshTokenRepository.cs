using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Category;
using Server.Dtos.Supplier;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class RefreshTokenRepository : Repository<RefreshToken>, IRefreshTokenRepository
    {
        private readonly MutiFashionContext _db;
        public RefreshTokenRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task UpdateRevokedAsync(RefreshToken storedToken)
        {
            var token = await _db.RefreshTokens.FirstOrDefaultAsync(t => t.Token == storedToken.Token);
            token.IsRevoked = true;
            token.IsUsed = true; 
            await _db.SaveChangesAsync();
        }
    }
}
