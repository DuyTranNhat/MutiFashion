using ecommerce_backend.Mappers;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Option;
using Server.Dtos.Supplier;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class OptionRepository : Repository<Option>, IOptionRepository
    {
        private readonly MutiFashionContext _db;
        public OptionRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Option> ToggleFilterAsync(int id)
        {

            var optionRS = await _db.Options.FirstOrDefaultAsync(a => a.OptionId == id);
            if (optionRS != null) optionRS.ActiveStatus = !optionRS.ActiveStatus;
            await _db.SaveChangesAsync();
            return optionRS;
        }

        public async Task<OptionDto> UpdateAsync(int id, UpdateOptionDto updateOptionDto)
        {
            var attributeModel = _db.Options.Include(x => x.Values)
                .FirstOrDefault(a => a.OptionId == id);
            if (attributeModel == null) return null;
            attributeModel.Name = updateOptionDto.Name;

            List<Value> tmpList = attributeModel.Values.ToList();

            updateOptionDto.Values.ToList().ForEach(v =>
            {
                var value = attributeModel.Values.FirstOrDefault(x => x.ValueId == v.ValueId);
                if (value == null)
                {
                    attributeModel.Values.Add(new Value()
                    {
                        OptionId = attributeModel.OptionId,
                        Value1 = v.Value,
                    });
                }
                else
                {
                    value.Value1 = v.Value;
                    tmpList.Remove(value);
                }
            });
            await _db.SaveChangesAsync();
            return attributeModel.ToOptionDto();
        }
    }
}
