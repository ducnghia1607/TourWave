using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Schedule>> GetAllScheduleForTour([FromRoute] int id)
        {

            var spec = new SchedulesWithFilter(id);
            var schedules = await unit.Repository<Schedule>().ListAsyncWithSpec(spec);
            if (schedules == null) return NotFound();
            return Ok(schedules);

        }
    }
}