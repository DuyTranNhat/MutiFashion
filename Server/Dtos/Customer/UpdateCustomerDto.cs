namespace Server.Dtos.Customer
{
    public class UpdateCustomerDto
    {
        public int CustomerId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public IFormFile? Image { get; set; }
    }
}