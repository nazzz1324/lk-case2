using Account.Application.Resources;
using Account.Domain.DTO.Competence;
using Account.Domain.Entity;
using Account.Domain.Entity.LinkedEntites;
using Account.Domain.Enum;
using Account.Domain.Interfaces.Repositories;
using Account.Domain.Interfaces.Services;
using Account.Domain.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.Application.Services
{
    public class CompetenceService : ICompetenceService
    {
        private readonly IBaseRepository<Competence> _competenceRepository;
        private readonly IBaseRepository<Indicator> _indicatorRepository;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public CompetenceService(IBaseRepository<Competence> competenceRepository, ILogger logger, IMapper mapper, IBaseRepository<Indicator> indicatorRepository)
        {
            _competenceRepository = competenceRepository;
            _logger = logger;
            _mapper = mapper;
            _indicatorRepository = indicatorRepository;
        }

        public async Task<BaseResult<Competence>> CreateCompetenceAsync(CreateCompetenceDto dto)
        {
            var existingCompetence = await _competenceRepository.GetAll()
                .FirstOrDefaultAsync(x => x.Index == dto.Index || x.Name == dto.Name);

            if (existingCompetence != null)
            {
                _logger.Error("Компетенция уже существует. Index: {Index}, Name: {Name}",
                    dto.Index, dto.Name);
                throw new ExceptionResult(
                    ErrorCodes.CompetenceAlreadyExists,
                    ErrorMessage.CompetenceAlreadyExists
                );
            }

           
            var competence = new Competence
            {
                Index = dto.Index,
                Name = dto.Name,
                Description = dto.Description
            };

            if (dto.IndicatorIds != null && dto.IndicatorIds.Any())
            {
             
                var indicators = await _indicatorRepository.GetAll()
                    .Where(x => dto.IndicatorIds.Contains(x.Id.ToString()))
                    .ToListAsync();

                foreach (var indicator in indicators)
                {
                    indicator.CompetenceId = competence.Id; 
                }
            }

            
            await _competenceRepository.CreateAsync(competence);
            await _competenceRepository.SaveChangesAsync();

            _logger.Information("Компетенция создана. Id: {Id}, Index: {Index}, Привязано индикаторов: {Count}",
                competence.Id, competence.Index,
                dto.IndicatorIds?.Count ?? 0);

            
            return new BaseResult<Competence>()
            {
                Data = _mapper.Map<Competence>(competence)
            };
        }

        public Task<BaseResult<CompetenceDto>> DeleteCompetenceeAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task<CollectionResult<CompetencesDto>> GetCompetencesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<BaseResult<CompetenceDto>> UpdateCompetenceAsync(CompetenceDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
