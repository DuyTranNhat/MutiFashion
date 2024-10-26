using Server.Mapper;
using Server.Dtos.Auth;
using Server.Exceptions;
using Server.Dtos.Customer;
using Server.Service.IService;
using Server.Repository.IRepository;
using Server.Models;

namespace Server.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        public AuthService(IUnitOfWork unitOfWork, ITokenService tokenService)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
        }

        public async Task<CustomerDto> Register(RegisterCusRequest registerRequest)
        {
            var user = await _unitOfWork.Customer.GetAsync(u => u.Email == registerRequest.Email);
            if (user != null) return null;
            user = registerRequest.ToRegisterFromCreateDto();
            user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password, 13);
            await _unitOfWork.Customer.AddAsync(user);
            await _unitOfWork.SaveAsync();
            return user.ToCustomerDto();
        }

        public async Task<LoginReponseDto> Login(LoginRequestDto loginRequest)
        {
            var user = await _unitOfWork.Customer.GetAsync(user => 
                user.Email == loginRequest.Email) ?? throw new UnauthorizedAccessException("Account is not existed!");

            if (!BCrypt.Net.BCrypt.EnhancedVerify(loginRequest.Password, user.Password))
                throw new BadHttpRequestException("Invalid Password");

            TokenKit token = await _tokenService.GenerateToken(user);

            return new LoginReponseDto
            {
                TokenKit = token,
                User = user.ToCustomerDto(),
            };
        }
        public async Task<Customer?> Logout(int idUser)
        {
            var result = await _tokenService.InvalidateRefreshToken(idUser);
            return result;
        }
    }
}