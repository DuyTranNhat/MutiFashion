namespace Server.Helper
{
    public class QueryObject<T>
    {

        public IEnumerable<T> Items { get; set; } = null!;
        public int TotalItems { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }

        public QueryObject(IEnumerable<T> items, int totalItems, int currentPage, int totalPages, int pageSize)
        {
            Items = items;
            TotalItems = totalItems;
            CurrentPage = currentPage;
            TotalPages = totalPages;
            PageSize = pageSize;
        }
    }
}
