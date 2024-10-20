using Microsoft.EntityFrameworkCore;
using Server.Helper;

namespace Server.Mapper
{
    public static class PaginationMapper
    {
        public static QueryObject<T> ToPagination<T>(this IEnumerable<T> items, int page, int limit)
        {
            IQueryable<T> query = items.AsQueryable();
            var count = query.Count();
            var data = query.Skip((page - 1) * limit).Take(limit).ToList();
            var totalPages = (int)Math.Ceiling(count / (double)limit);
            return new QueryObject<T>(data, count, page, totalPages, limit);
        }
        public static async Task<QueryObject<T>> ToPaginationAsync<T>(this IQueryable<T> items, int page, int limit)
        {
            var count = items.CountAsync();
            var data = items.Skip((page - 1) * limit).Take(limit).ToListAsync();
            await Task.WhenAll(count, data);

            var totalPages = (int)Math.Ceiling(count.Result / (double)limit);
            return new QueryObject<T>(data.Result, count.Result, page, totalPages, limit);
        }

    }
}
