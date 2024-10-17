using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Value
{
    public class ValueDto
    {
        public int ValueId { get; set; }
        public string Value { get; set; } = null!;
    }
}
