using Account.Domain.DTO.Competence;
using Account.Domain.Interfaces.Services;
using Account.Domain.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.Application.Services
{
    public class CompetenceService : ICompetenceService
    {
        public Task<BaseResult<CompetenceDto>> CreateCompetenceAsync(CompetenceDto dto)
        {
            throw new NotImplementedException();
        }

        public Task<BaseResult<CompetenceDto>> DeleteCompetenceeAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<BaseResult<CompetenceDto>> UpdateCompetenceAsync(CompetenceDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
