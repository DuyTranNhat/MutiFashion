namespace Server.Helper
{
    public class QueryObject<T> 
    {
        public PageObject Page { get; set; }
        public IEnumerable<T> Items { get; set; } = null!;
      

        public QueryObject(IEnumerable<T> items, int totalItems, int currentPage, int totalPages, int pageSize)
        {
            Items = items;
            Page = new PageObject(totalItems, currentPage, totalPages, pageSize);
        }
    }

    public class PageObject
    {
        public PageObject(int totalItems, int currentPage, int totalPages, int pageSize)
        {
            TotalItems = totalItems;
            CurrentPage = currentPage;
            TotalPages = totalPages;
            PageSize = pageSize;
        }
        public int TotalItems { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
    }
}
