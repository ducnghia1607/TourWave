using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DeparturesController(IGenericRepository<Departure> repo) : BaseApiController
    {
         [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Departure>>> GetAllDepatures(){
            var departures = await repo.ListAllAsync();
            return Ok(departures);
        }
    }
}