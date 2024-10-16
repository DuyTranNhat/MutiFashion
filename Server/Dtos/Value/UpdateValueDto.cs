using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_backend.Dtos.Value
{
    public class UpdateValueDto
    {
        [Required]
        public int? ValueId { get; set; }
        [Required]
        [MaxLength(255)]
        public string Value { get; set; }
    }
}
