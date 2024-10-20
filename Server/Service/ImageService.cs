using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using Server.Service.IService;

namespace Server.Service
{
    public class ImageService : IImageService
    {
        private string _uploadsFolder;
        private string _currentDirect = "images/";

        public ImageService()
        {
            _uploadsFolder = Path.Combine(Directory.
                GetCurrentDirectory(), "wwwroot", _currentDirect);
            Directory.CreateDirectory(_uploadsFolder); 
        }

        public async Task SetDirect(string direct)
        {
            _currentDirect = direct;
            _uploadsFolder = Path.Combine(Directory.
                GetCurrentDirectory(), "wwwroot", _currentDirect);
        }

        public async Task<string> HandleImageUpload(IFormFile imageFile)
        {
            if (!Directory.Exists(_uploadsFolder))
            {
                Directory.CreateDirectory(_uploadsFolder);
            }
            var uniqueFileName = Guid.NewGuid() + "_" + imageFile.FileName;
            var filePath = Path.Combine(_uploadsFolder, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return Path.Combine(_currentDirect, uniqueFileName);
        }

        public async Task DeleteOldImage(string oldImageUrl)
        {
            if (!string.IsNullOrEmpty(oldImageUrl))
            {
                var oldImagePath = Path.Combine(Directory
                    .GetCurrentDirectory(), "wwwroot", oldImageUrl.TrimStart('/'));
                if (File.Exists(oldImagePath))
                {
                    File.Delete(oldImagePath);
                }
            }
        }

    }
}