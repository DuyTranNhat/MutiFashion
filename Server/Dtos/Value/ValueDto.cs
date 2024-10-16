using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Value
{
    public class ValueDto
    {
        [Required]
        public int ValueId { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string Value { get; set; } = null!;
    }
}
