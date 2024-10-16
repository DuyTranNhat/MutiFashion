using ecommerce_backend.Dtos.Value;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Option
{
    public class UpdateOptionDto
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        public virtual ICollection<UpdateValueDto> Values { get; set; } = new List<UpdateValueDto>();
    }
}
