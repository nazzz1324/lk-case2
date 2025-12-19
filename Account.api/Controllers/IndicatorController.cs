using Account.Domain.DTO.Indicator;
using Account.Domain.Interfaces.Services;
using Account.Domain.Result;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace Account.api.Controllers
{
    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(Roles = "Admin")]
    public class IndicatorController : ControllerBase
    {
        private readonly IIndicatorService _indicatorService;

        public IndicatorController(IIndicatorService indicatorService)
        {
            _indicatorService = indicatorService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(BaseResult<CreateIndicatorDto>), 200)]
        [ProducesResponseType(typeof(BaseResult<CreateIndicatorDto>), 400)]
        public async Task<ActionResult<BaseResult<CreateIndicatorDto>>> Create([FromBody] CreateIndicatorDto dto)
        {
            var response = await _indicatorService.CreateIndicatorAsync(dto);

            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
    }
}
