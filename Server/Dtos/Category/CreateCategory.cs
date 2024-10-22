using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Category
{
    public class CreateCategoryDto
    {

        [Required]
        public string Name { get; set; }
    }
}
