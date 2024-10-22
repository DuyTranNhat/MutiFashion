using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Server.Dtos.Slide
{
    public class SlideRequestDto
    {
        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string Title { get; set; } = null!;

        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string? Link { get; set; }

        [Required]
        public IFormFile ImageFile { get; set; } = null!;

        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string? Description { get; set; }

        [Required]
        public bool Status { get; set; }
    }
}
