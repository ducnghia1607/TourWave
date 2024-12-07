using System;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class ToursController : BaseApiController
{
    private readonly TourContext _context;
    public ToursController(TourContext context)
    {
        _context = context;
    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<Tour>>> GetTours(){
        return await _context.Tours.ToListAsync();
    }
    [HttpGet("{id:int}")] // api/tours/2
    public async Task<ActionResult<Tour>> GetTour(int id){
        var tour = await _context.Tours.FindAsync(id);
        if(tour == null){
            return NotFound();
        }
       return tour;
    }  

    [HttpPost]
    public async Task<ActionResult<Tour>> CreateTour(Tour tour){
        await _context.Tours.AddAsync(tour);
        await _context.SaveChangesAsync();
                return tour;
    }

    [HttpPut("{id:int}")] // api/
    public async Task<ActionResult> UpdateTour(int id ,Tour tour){
        if(tour.Id != id || !TourExists(id)){
            return BadRequest("Cannot update tour");
        }
        _context.Entry(tour).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

        [HttpDelete("{id:int}")] // api/
    public async Task<ActionResult> DeleteProduct(int id){
        var tour = await _context.Tours.FindAsync(id);
        if(tour == null){
            return NotFound();
        }
        _context.Tours.Remove(tour);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    public bool TourExists(int id){
        return _context.Tours.Any(x => x.Id == id);
    }
}
