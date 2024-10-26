using Server.Dtos.Customer;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Auth
{
    public class RegisterCusRequest
    {
        [Required]
        public string Name { get; set; }
       
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }


        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }

    public class LoginRequestDto
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }

    public class LogoutRequest
    {
        [Required(ErrorMessage = "ID User is required")]
        public int IdUser { get; set; }
    }

    public class LoginReponseDto
    {
        public TokenKit TokenKit { get; set; }
        public CustomerDto User { get; set; } = null!;
    }

    public class TokenKit
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; } = null!;
    }
}
