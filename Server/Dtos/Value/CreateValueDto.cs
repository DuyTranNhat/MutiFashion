using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Value
{
    public class CreateValueDto
    {
        [MaxLength(255, ErrorMessage = "Value name cannot be over 255 over characters")]
        public string Value { get; set; }
    }
}
