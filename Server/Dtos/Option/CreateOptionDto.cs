using Server.Dtos.Value;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Option
{
    public class CreateOptionDto
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        public virtual ICollection<CreateValueDto> Values { get; set; } = new List<CreateValueDto>();

    }
}
