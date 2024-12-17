using System;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class ToursController(ITourRepository repo) : BaseApiController
{

    [HttpGet]

    public async Task<ActionResult<IReadOnlyList<Tour>>> GetTours(){
        return Ok(await repo.GetToursAsync());
    }
    [HttpGet("{id:int}")] // api/tours/2
    public async Task<ActionResult<Tour>> GetTour(int id){
        var tour = await repo.GetTourByIdAsync(id);
        if(tour == null){
            return NotFound();
        }
       return tour;
    }  

    [HttpPost]
    public async Task<ActionResult<Tour>> CreateTour(Tour tour){
        repo.AddTour(tour);
        if(await repo.SaveChangesAsync()){
            return CreatedAtAction("GetTour",new {id = tour.Id},tour);
        };
        return BadRequest("Problem creating new tour");
    }

    [HttpPut("{id:int}")] // api/
    public async Task<ActionResult> UpdateTour(int id ,Tour tour){
        if(tour.Id != id || !TourExists(id)){
            return BadRequest("Cannot update tour");
        }
        repo.UpdateTour(tour);
        if(await repo.SaveChangesAsync()){
            return NoContent();
        }
        return BadRequest("Problem updating the tour");
    }

        [HttpDelete("{id:int}")] // api/
    public async Task<ActionResult> DeleteTour(int id){
        var tour = await repo.GetTourByIdAsync(id);
        if(tour == null){
            return NotFound();
        }
        repo.DeleteTour(tour);
        if(await repo.SaveChangesAsync()){
            return NoContent();
        }
        return BadRequest("Problem deleting the tour");
    }

    public bool TourExists(int id){
        return repo.TourExists(id);
    }
}
