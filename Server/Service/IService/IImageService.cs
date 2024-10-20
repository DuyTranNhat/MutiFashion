namespace Server.Service.IService
{
    public interface IImageService
    {
        Task SetDirect(string direct);
        Task<string> HandleImageUpload(IFormFile imageFile);

        Task DeleteOldImage(string oldImageUrl);
    }
}
