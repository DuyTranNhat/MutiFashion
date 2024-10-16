using Server.Dtos.Value;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Option
{
    public class OptionDto
    {
        public int OptionID { get; set; }
        public string Name { get; set; }
        public bool activeFilter { get; set; }
        public virtual ICollection<ValueDto> Values { get; set; } = new List<ValueDto>();
    }
}
