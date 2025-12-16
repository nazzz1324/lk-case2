using Account.Application.Resources;
using Account.Domain.DTO.Indicator;
using Account.Domain.Entity.AuthRole;
using Account.Domain.Entity.LinkedEntites;
using Account.Domain.Enum;
using Account.Domain.Interfaces.Repositories;
using Account.Domain.Interfaces.Services;
using Account.Domain.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.Application.Services
{
    public class IndicatorService : IIndicatorService
    {
        private readonly IBaseRepository<Indicator> _indicatorRepository;
        private readonly IMapper _mapper;

        public IndicatorService(IBaseRepository<Indicator> indicatorRepository, IMapper mapper)
        {
            _indicatorRepository = indicatorRepository;
            _mapper = mapper;
        }

        public async Task<BaseResult<Indicator>> CreateIndicatorAsync(IndicatorDto dto)
        {
            var exists = await _indicatorRepository.GetAll()
                    .AnyAsync(i => i.Id == dto.Id);

            if (exists)
            {
                throw new ExceptionResult(
                    ErrorCodes.IndicatorAlreadyExists,
                    ErrorMessage.IndicatorAlreadyExists
                );
            }

            var indicator = new Indicator
            {
                Id = dto.Id, // Id в DTO = Code в сущности
                Name = dto.Name
            };

            await _indicatorRepository.CreateAsync(indicator);
            await _indicatorRepository.SaveChangesAsync();

            return new BaseResult<Indicator>
            {
                Data = new Indicator
                {
                    Id = indicator.Id,
                    Name = indicator.Name
                }
            };
        }

        public Task<BaseResult<IndicatorDto>> DeleteIndicatorAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<BaseResult<IndicatorDto>> UpdateIndicatorAsync(IndicatorDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
