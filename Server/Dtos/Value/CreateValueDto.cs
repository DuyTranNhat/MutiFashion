using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Value
{
    public class CreateValueDto
    {
        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string Value { get; set; }
    }
}
