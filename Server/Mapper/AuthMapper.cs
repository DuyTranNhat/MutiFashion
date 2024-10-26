using Server.Models;
using Server.Dtos.Auth;

namespace Server.Mapper
{
    public static class AuthMapper
    {
        public static Customer ToRegisterFromCreateDto(this RegisterCusRequest registerRequest)
        {
            return new Customer
            {
                Name = registerRequest.Name,
                Email = registerRequest.Email,
                Password = registerRequest.Password,
                Role = "customer"
            };
        }
    }
}
