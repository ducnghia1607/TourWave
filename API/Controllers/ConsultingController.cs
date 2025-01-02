using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ConsultingController(IUnitOfWork unit) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Consulting>>> GetAllConsulting()
        {
            var spec = new ConsultingSpecification();
            return Ok(await unit.Repository<Consulting>().ListAsyncWithSpec(spec));
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
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteConsulting(int id){
            var consulting = await unit.Repository<Consulting>().GetByIdAsync(id);
            if(consulting == null) return NotFound();
            unit.Repository<Consulting>().Remove(consulting);
            if(await unit.Complete()){
                return NoContent();
             }
             return BadRequest("Problem deleting the tour");
        }
     }
}
