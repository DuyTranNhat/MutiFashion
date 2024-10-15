using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Supplier
{
    public class CreateSupplierDto
    {
        [Required]
        [MaxLength(255)]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }

        [Required]
        [Phone]
        [MaxLength(50)]
        public string? Phone { get; set; }
        [Required]
        [MaxLength(500)]
        public string? Address { get; set; }

        [Required]
        public bool Status { get; set; }

        public string? Notes { get; set; }
    }
}
