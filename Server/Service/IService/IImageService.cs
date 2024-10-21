namespace Server.Service.IService
{
    public interface IImageService
    {
        Task SetDirect(string direct);
        Task<string> HandleImageUploadAsync(IFormFile imageFile);

        Task DeleteOldImage(string oldImageUrl);
    }
}
