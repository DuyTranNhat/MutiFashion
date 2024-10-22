using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Slide
{
    public class SlideDto
    {
        public int SlideId { get; set; }
        public string Title { get; set; } = null!;
        public string? Link { get; set; }
        public IFormFile? ImageFile { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public bool Status { get; set; }
    }
}
