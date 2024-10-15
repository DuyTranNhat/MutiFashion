namespace Server.Dtos.Supplier
{
    public class SupplierDto
    {

        public int SupplierId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public bool? Status { get; set; }

        public string? Notes { get; set; }
    }
}
