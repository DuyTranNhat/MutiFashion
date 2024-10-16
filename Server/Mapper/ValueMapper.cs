using Server.Dtos.Value;
using Server.Models;
using ecommerce_backend.Dtos.Value;

namespace Server.Mappers
{
    public static class ValueMapper
    {
        public static Value ToValueModelFromCreate(this CreateValueDto valueDto, int OptionID)
        {
            return new Value
            {
                Value1 = valueDto.Value,
                OptionId = OptionID,
            };
        }

        public static ValueDto ToValueDto(this Value value)
        {
            return new ValueDto
            {
                ValueId = value.ValueId,
                Value = value.Value1,
            };
        }
    }
}
