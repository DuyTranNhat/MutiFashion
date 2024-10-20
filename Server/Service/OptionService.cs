using ecommerce_backend.Mappers;
using Server.Dtos.Option;
using Server.Models;
using Server.Repository.IRepository;
using Server.Service.IService;

namespace Server.Service
{
    public class OptionService : IOptionService
    {
        private  readonly IUnitOfWork _unitOfWork;
        public OptionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }




        public async Task<List<OptionDto>> GetAllAsync()
        {
            var optionExisting = await _unitOfWork.Option.
                GetAllAsync(includeProperties: "Values");
            return optionExisting.Select(o => o.ToOptionDto()).ToList();
        }

        public async Task<List<OptionDto>> GetAllActiveAsync()
        {
            var attributeModels = await _unitOfWork.Option.GetAllAsync(o 
                => o.ActiveStatus ?? false, includeProperties: "Values");
            var optionDtos = attributeModels.Select(x => x.ToOptionDto()).ToList();
            return optionDtos;
        }

        public async Task<OptionDto> CreateAsync(CreateOptionDto createOptionDto)
        {
            var optionModel = createOptionDto.ToAttributeFromCreateDto();
            await _unitOfWork.Option.AddAsync(optionModel);
            await _unitOfWork.SaveAsync();
            var optionRS = await GetByIDAsync(optionModel.OptionId);
            return optionRS;
        }

        public async Task<OptionDto> GetByIDAsync(int idOption)
        {
            var optionRS = await _unitOfWork.Option.GetAsync(o => 
                o.OptionId == idOption, includeProperties: "Values");
            if (optionRS == null) return null;
            return optionRS.ToOptionDto();
        }

        public async Task<OptionDto> UpdateAsync(int id, UpdateOptionDto attributeDto)
        {
            var optionUpdated = await _unitOfWork.Option.UpdateAsync(id, attributeDto);
            return optionUpdated;
        }

        public async Task<Option> ToggleFilterAsync(int id)
        {
            var OptionRS = await _unitOfWork.Option.ToggleFilterAsync(id);
            return OptionRS;
        }
    }
}
