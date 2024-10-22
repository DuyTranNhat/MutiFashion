using Server.Dtos.Slide;
using Server.Models;
namespace Server.Mappers
{
    public static class SlideMappers
    {
        public static SlideDto ToBannerDto(this Slide slide)
        {
            return new SlideDto
            {
                Link = slide.Link,
                Title = slide.Title,
                Status = slide.Status,
                ImageUrl = slide.Image,  
                SlideId = slide.SlideId,
                Description = slide.Description,
            };
        }
        public static Slide ToBannerFromCreate(this SlideRequestDto slideDto, string imageUrl)
        {
            return new Slide
            {
                Title = slideDto.Title,
                Link = slideDto.Link,
                Image = imageUrl,
                Description = slideDto.Description,
                Status = slideDto.Status 
            };
        }

    }
}
