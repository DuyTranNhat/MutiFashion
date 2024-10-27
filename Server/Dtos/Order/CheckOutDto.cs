using Server.Dtos.Cart;
using Server.Dtos.Customer;
using Server.Helper;

namespace Server.Dtos.Order
{
    public class CheckOutDto
    {
        public CustomerDto Customer { get; set; }
        public QueryObject<CartDto> Cart { get; set; }
       
    }
}
