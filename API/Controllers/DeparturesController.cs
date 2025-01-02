using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DeparturesController(IUnitOfWork unit) : BaseApiController
    {
         [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Departure>>> GetAllDepatures(){
            var departures = await unit.Repository<Departure>().ListAllAsync();
            return Ok(departures);
        }
    }
}