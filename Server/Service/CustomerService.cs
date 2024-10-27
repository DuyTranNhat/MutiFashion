using Server.Dtos.Customer;
using Server.Mapper;
using Server.Models;
using Server.Repository.IRepository;
using Server.Service.IService;

namespace Server.Service
{
    public class CustomerService : ICustomerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;

        public CustomerService(IUnitOfWork unitOfWork, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }
        
        public async Task<CustomerDto> GetByIdAsync(int id)
        {
            var customerExisting = await _unitOfWork.Customer.GetAsync(customer => customer.CustomerId == id);
            if (customerExisting == null) return null;
            return customerExisting.ToCustomerDto();
        }

        public async Task<Customer> updateProfileAsync(int id, UpdateCustomerDto customerDto)
        {
            var customerExisting =  await _unitOfWork.Customer.GetAsync(customer => customer.CustomerId == id)
                ?? throw new BadHttpRequestException("Customer not found");
            string imageUrl = customerExisting.ImageUrl;
            if (customerDto.Image != null)
            {
                _imageService.SetDirect("images/customerAvar");
                imageUrl = await _imageService.HandleImageUploadAsync(customerDto.Image);
                _imageService.DeleteOldImage(customerExisting.ImageUrl);
            }


            await _unitOfWork.Customer.UpdateAsync(id, customerDto, imageUrl);
            return customerExisting;
        }
    }
}
