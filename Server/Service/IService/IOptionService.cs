
using Server.Dtos.Option;
using Server.Models;

namespace Server.Service.IService
{
    public interface IOptionService
    {
        Task<OptionDto> CreateAsync(CreateOptionDto createOptionDto);
        Task<List<OptionDto>> GetAllActiveAsync();
        Task<List<OptionDto>> GetAllAsync();
        Task<OptionDto> GetByIDAsync(int idOption);
        Task<Option> ToggleFilterAsync(int id);
        Task<OptionDto> UpdateAsync(int id, UpdateOptionDto attributeDto);
    }
}
