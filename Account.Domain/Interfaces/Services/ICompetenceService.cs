using Account.Domain.DTO.Competence;
using Account.Domain.DTO.Role;
using Account.Domain.DTO.UserRole;
using Account.Domain.DTO.UserRoleDto;
using Account.Domain.Entity;
using Account.Domain.Entity.AuthRole;
using Account.Domain.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.Domain.Interfaces.Services
{
    public interface ICompetenceService
    {
        /// <summary>
        /// Создание компетенции
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<BaseResult<CompetenceDto>> CreateCompetenceAsync(CompetenceDto dto);
        /// <summary>
        /// Удаление компетенции
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<BaseResult<CompetenceDto>> DeleteCompetenceeAsync(string id);
        /// <summary>
        /// Обновление компетенции
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<BaseResult<CompetenceDto>> UpdateCompetenceAsync(CompetenceDto dto);
        /// <summary>
        /// Добавление компетенции в профроль
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        //Task<BaseResult<CompetenceDto>> AddCompetenceForProfessionalRoleAsync(CompetenceDto dto);
        /// <summary>
        /// Удаление компетенции из профроли
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        //Task<BaseResult<CompetenceDto>> DeleteCompetenceFromProfessionalRoleAsync(CompetenceDto dto);
    }
}
