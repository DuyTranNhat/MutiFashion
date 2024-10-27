using Server.Dtos.Paypal;
using Server.Service.IService;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Server.Service
{
    public sealed class PaypalService : IPaypalService
    {
        private readonly ICartService _cartService;
        private readonly IConfiguration _configuration;
        public string Mode { get; }
        public string ClientId { get; }
        public string ClientSecret { get; }

        public string BaseUrl => Mode == "Live"
            ? "https://api-m.paypal.com"
            : "https://api-m.sandbox.paypal.com";

        public PaypalService(IConfiguration configuration, ICartService cartService)
        {
            _cartService = cartService;
            _configuration = configuration;
            ClientId = _configuration["PaypalOptions:AppId"];
            ClientSecret = _configuration["PaypalOptions:AppSecret"];
            Mode = _configuration["PaypalOptions:Mode"];
        }

        private async Task<AuthResponse> Authenticate()
        {
            var auth = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{ClientId}:{ClientSecret}"));

            var content = new List<KeyValuePair<string, string>>
            {
                new("grant_type", "client_credentials")
            };

            var request = new HttpRequestMessage
            {
                RequestUri = new Uri($"{BaseUrl}/v1/oauth2/token"),
                Method = HttpMethod.Post,
                Headers =
                {
                    { "Authorization", $"Basic {auth}" }
                },
                Content = new FormUrlEncodedContent(content)
            };

            var httpClient = new HttpClient();
              var httpResponse = await httpClient.SendAsync(request);
            var jsonResponse = await httpResponse.Content.ReadAsStringAsync();
            var response = JsonSerializer.Deserialize<AuthResponse>(jsonResponse);

            return response;
        }

        public async Task<CreateOrderResponse> CreateOrderAsync(int idUser)
        {
            var auth = await Authenticate();

            var currency = "USD";
            var carts = await _cartService.GetCartByUserAsync(idUser, 1, 30);

            decimal total = 0;
            foreach (var cart in carts.Items)
            {
                total += cart.Quantity * cart.Variant.SalePrice;
            }

            var reference = "DH" + DateTime.Now.Ticks.ToString();
                
            var request = new CreateOrderRequest
            {
                intent = "CAPTURE",
                purchase_units = new List<PurchaseUnit>
                {
                    new()
                    {
                        reference_id = reference,
                        amount = new Amount
                        {
                            currency_code = currency,
                            value = total.ToString()
                        }
                    }
                }
            };

            var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Authorization = AuthenticationHeaderValue.Parse($"Bearer {auth.access_token}");

            var httpResponse = await httpClient.PostAsJsonAsync($"{BaseUrl}/v2/checkout/orders", request);

            var jsonResponse = await httpResponse.Content.ReadAsStringAsync();
            var response = JsonSerializer.Deserialize<CreateOrderResponse>(jsonResponse);

            return response;
        }

        public async Task<CaptureOrderResponse> CaptureOrder(string orderId)
        {
            var auth = await Authenticate();

            var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Authorization = AuthenticationHeaderValue.Parse($"Bearer {auth.access_token}");

            var httpContent = new StringContent("", Encoding.Default, "application/json");

            var httpResponse = await httpClient.PostAsync($"{BaseUrl}/v2/checkout/orders/{orderId}/capture", httpContent);

            var jsonResponse = await httpResponse.Content.ReadAsStringAsync();
            var response = JsonSerializer.Deserialize<CaptureOrderResponse>(jsonResponse);

            return response;
        }
    }

}
