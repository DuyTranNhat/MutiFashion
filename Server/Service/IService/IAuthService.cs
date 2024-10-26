using Server.Dtos.Auth;
using Server.Dtos.Customer;
using Server.Models;
namespace Server.Service.IService
{
    public interface IAuthService
    {
        Task<CustomerDto> Register(RegisterCusRequest customerDto);
        Task<LoginReponseDto>  Login(LoginRequestDto loginRequest);
        Task<Customer> Logout(int userId);
    }
}
