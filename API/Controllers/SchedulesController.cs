using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SchedulesController(IUnitOfWork unit) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<Schedule>> GetSchedulesOfTourByFilter([FromQuery]string date, [FromQuery] string tourId)
        {
            var spec = new SchedulesWithFilter(date, tourId);
            var schedules = await unit.Repository<Schedule>().ListAsyncWithSpec(spec);
            if (schedules == null) return NotFound();
            return Ok(schedules);

        }

        [HttpGet]
        public async Task<ActionResult<Schedule>> GetRemainingSpotOnSchedule([FromQuery] string date, [FromQuery] string tourId)
        {
            var spec = new SchedulesWithFilter(date, tourId);
            var schedules = await unit.Repository<Schedule>().ListAsyncWithSpec(spec);
            if (schedules == null) return NotFound();
            return Ok(schedules);

        }
    }
}