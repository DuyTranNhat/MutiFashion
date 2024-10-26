namespace Server.Dtos.Customer
{
    public class CustomerDto
    {
        public int CustomerId { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? ImageUrl { get; set; }
        public string Role { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
