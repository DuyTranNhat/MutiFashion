using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Product
{
    public class FilterProductUserRequest
    {
        [StringLength(100, ErrorMessage = "SearchKey cannot exceed 100 characters.")]
        public string? SearchKey { get; set; }
        
        public int? SelectedValue { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Page must be greater than 0.")]
        public int? Page { get; set; }

        [Range(1, 100, ErrorMessage = "Limit must be between 1 and 100.")]
        public int Limit { get; set; } = 3; // Default value

        public bool PriceAcs { get; set; }

        public bool PriceDes { get; set; }
    }
}
