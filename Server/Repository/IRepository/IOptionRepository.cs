using Server.Dtos.Option;
using Server.Dtos.Supplier;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IOptionRepository : IRepository<Option>
    {
        Task<Option> ToggleFilterAsync(int id);
        Task<OptionDto> UpdateAsync(int id, UpdateOptionDto attributeDto);
    }
}
