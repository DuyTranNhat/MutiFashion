using Server.Dtos.Option;
using Server.Mappers;
using Server.Models;
using System;

namespace ecommerce_backend.Mappers
{
    public static class OptionMapper
    {
        public static OptionDto ToOptionDto(this Option OptionModel)
        {
            return new OptionDto
            {
                OptionID = OptionModel.OptionId,
                Name = OptionModel.Name,
                activeFilter = OptionModel.ActiveStatus ?? false,
                Values = OptionModel.Values.Select(v => v.ToValueDto()).ToList()
            };
        }

        public static Option ToAttributeFromCreateDto(this CreateOptionDto OptionDto)
        {
            var OptionModel = new Option { Name = OptionDto.Name, ActiveStatus = false };
            OptionModel.Values = (OptionDto.Values.Select(v => 
            v.ToValueModelFromCreate(OptionModel.OptionId))).ToList();
            return OptionModel;
        }
    }
}
