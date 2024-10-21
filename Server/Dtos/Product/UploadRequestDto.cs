using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Product
{
    public class UploadRequestDto
    {
        public IFormFile ImageFile { get; set; }
    }

    public class UploadListRequestDto
    {
        public List<IFormFile>? fileImages { get; set; }
    }
}
