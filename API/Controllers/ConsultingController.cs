using API.DataHelpers;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using Stripe.Climate;

namespace API.Controllers
{
    public class ConsultingController(IUnitOfWork unit,IMapper mapper) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<Pagination<ConsultingDto>>> GetAllConsulting([FromQuery] string sort, [FromQuery] string order, [FromQuery]int page, [FromQuery] string  ?date, [FromQuery] string ?search)
        {
            var spec = new ConsultingSpecification(sort,order,page,date,search);
            var items = await unit.Repository<Consulting>().ListAsyncWithSpec(spec);
            var count = await unit.Repository<Consulting>().CountAsync(spec);
            var data = mapper.Map<IReadOnlyList<Consulting>, IReadOnlyList<ConsultingDto>>(items);
            // pageNumber:20
            var pagination = new Pagination<ConsultingDto>(page, 10, count, data);
            return Ok(pagination);
        }
        [HttpPost]
        public async Task<ActionResult<Consulting>> CreateConsulting(Consulting consulting){
            if (consulting.AppUserId == 0) consulting.AppUserId = null;
            if(consulting.CreatedAt == DateTime.MinValue) consulting.CreatedAt = DateTime.Now;
                unit.Repository<Consulting>().Add(consulting);
                if(await unit.Complete()){
                    return CreatedAtAction("CreateConsulting", new {id = consulting.Id},consulting);
                }
            return BadRequest("Problem creating new consulting");

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConsultingDto>> GetConsulting(int id)
        {
            var spec = new ConsultingSpecification(id);
            var item = await unit.Repository<Consulting>().GetEntityWithSpec(spec);
            // pageNumber:20
            return mapper.Map<Consulting, ConsultingDto>(item) ;

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteConsulting(int id){
            var consulting = await unit.Repository<Consulting>().GetByIdAsync(id);
            if(consulting == null) return NotFound();
            unit.Repository<Consulting>().Remove(consulting);
            if(await unit.Complete()){
                return NoContent();
             }
             return BadRequest("Problem deleting the consulting");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ConsultingDto>> UpdateStatusConsulting(int id)
        {
            var spec = new ConsultingSpecification(id);
            var consulting = await unit.Repository<Consulting>().GetEntityWithSpec(spec);
            if (consulting == null) return NotFound();
            consulting.Status = "1";
            unit.Repository<Consulting>().Update(consulting);
            if (await unit.Complete())
            {
                return mapper.Map<Consulting, ConsultingDto>(consulting);
            }
            return BadRequest("Problem update the consulting");
        }
    }
}
