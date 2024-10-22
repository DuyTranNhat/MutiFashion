using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Category
{
    public class UpdateCategoryDto
    {

        [Required]
        public string Name { get; set; }
    }
}
