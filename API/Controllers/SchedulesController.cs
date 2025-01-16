using API.DataHelpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SchedulesController(IUnitOfWork unit) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<Schedule>> GetSchedulesOfTourByFilter([FromQuery] string date, [FromQuery] string tourId)
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
        public async Task<ActionResult<Schedule>> GetAllScheduleForTour([FromQuery] string sort, [FromQuery] string order, [FromQuery] int page, [FromQuery] string? date, [FromRoute] int id)
        {
            var spec = new ScheduleSpecification(id, sort, order, page, date);
            var items = await unit.Repository<Schedule>().ListAsyncWithSpec(spec);
            var count = await unit.Repository<Schedule>().CountAsync(spec);
            // pageSize:10
            var pagination = new Pagination<Schedule>(page, 10, count, items);
            return Ok(pagination);

        }

        [HttpPut("{id:int}")] // id : tour id
        public async Task<ActionResult> UpdateScheduleForTour([FromRoute] int id, [FromQuery] int tourId, Schedule scheduleDto)
        {
            if (scheduleDto == null)
            {
                return BadRequest("Invalid schedule data.");
            }

            // Validate business rules
            if (scheduleDto.DepartureDate >= scheduleDto.ReturnDate)
            {
                return BadRequest("Departure date must be earlier than return date.");
            }
            var spec = new ScheduleSpecification(id, tourId);
            var scheduleToUpdate = await unit.Repository<Schedule>().GetEntityWithSpec(spec);
            if (scheduleToUpdate == null) return NotFound();
            scheduleToUpdate.DepartureDate = scheduleDto.DepartureDate;
            scheduleToUpdate.ReturnDate = scheduleDto.ReturnDate;
            scheduleToUpdate.PriceAdult = scheduleDto.PriceAdult;
            scheduleToUpdate.PriceChild = scheduleDto.PriceChild;
            unit.Repository<Schedule>().Update(scheduleToUpdate);
            if (await unit.Complete())
            {
                return NoContent();
            }
            return BadRequest("Problem updadeting tour schedule");
        }
    }
}
