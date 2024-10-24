
using Server.Dtos.Option;
using Server.Helper;
using Server.Models;

namespace Server.Service.IService
{
    public interface IOptionService
    {
        Task<OptionDto> CreateAsync(CreateOptionDto createOptionDto);
        Task<OptionDto> GetByIDAsync(int idOption);
        Task<QueryObject<OptionDto>> GetOptionsAsync(int page, int limit, bool isActive);
        Task<Option> ToggleFilterAsync(int id);
        Task<OptionDto> UpdateAsync(int id, UpdateOptionDto attributeDto);
    }
}
