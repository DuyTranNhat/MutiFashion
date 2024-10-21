
using Server.Dtos.Option;
using Server.Helper;
using Server.Models;

namespace Server.Service.IService
{
    public interface IOptionService
    {
        Task<OptionDto> CreateAsync(CreateOptionDto createOptionDto);
        Task<List<OptionDto>> GetAllActiveAsync();
        Task<OptionDto> GetByIDAsync(int idOption);
        Task<QueryObject<OptionDto>> GetOptionsAsync(int page, int limit);
        Task<Option> ToggleFilterAsync(int id);
        Task<OptionDto> UpdateAsync(int id, UpdateOptionDto attributeDto);
    }
}
