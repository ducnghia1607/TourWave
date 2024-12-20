using System;
using API.DTOs;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorized(){
        return Unauthorized();
    }
    [HttpGet("notfound")]
    public IActionResult GetNotFound(){
        return NotFound();
    }
    [HttpGet("badrequest")]
    public IActionResult GetBadRequest(){
        return BadRequest();
    }
    [HttpPost("validationerror")]
    public IActionResult GetValidationError(CreateTourDto tour){
        return Ok();
    }
    [HttpGet("internalservererror")]
    public IActionResult GetInternalServerError(){
        throw new Exception("This is a internal server error");
    }
}
