using Server.Dtos.Paypal;

namespace Server.Service.IService
{
    public interface IPaypalService
    {
        Task<CreateOrderResponse> CreateOrderAsync(int idUser);
        Task<CaptureOrderResponse> CaptureOrder(string orderId);
    }
}
