namespace Server.Dtos.Category
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public long Quantity { get; set; } = 0;
        public bool ActiveStatus { get; set; }
    }
}
