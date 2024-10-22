using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Server.Dtos.Slide
{
    public class UpdateSlideDto
    {
        public int SlideId { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string Title { get; set; } = null!;
        
        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string? Link { get; set; }
        
        public IFormFile? ImageFile { get; set; } 
        
        public string? ImageUrl { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string? Description { get; set; }
        
        public bool Status { get; set; } = true; 
    }
}
