using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ConsultingController(IGenericRepository<Consulting> repo) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Consulting>>> GetAllConsulting()
        {
            return Ok(await repo.ListAllAsync());
        }
        [HttpPost]
        public async Task<ActionResult<Consulting>> CreateConsulting(Consulting consulting){
            if(consulting.CreatedAt == DateTime.MinValue) consulting.CreatedAt = DateTime.Now;
                repo.Add(consulting);
                if(await repo.SaveAllASync()){
                    return CreatedAtAction("GetConsulting",new {id = consulting.Id},consulting);
                }
            return BadRequest("Problem creating new consulting");

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteConsulting(int id){
            var consulting = await repo.GetByIdAsync(id);
            if(consulting == null) return NotFound();
            repo.Remove(consulting);
            if(await repo.SaveAllASync()){
                return NoContent();
             }
             return BadRequest("Problem deleting the tour");
        }
     }
}
