using System;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class TourRepository(TourContext context) : ITourRepository
{
    public void AddTour(Tour tour)
    {
        context.Tours.Add(tour);
    }

    public void DeleteTour(Tour tour)
    {
        context.Tours.Remove(tour);
    }

    public async Task<Tour?> GetTourByIdAsync(int id)
    {
        return await context.Tours.FindAsync(id);
    }

    public async Task<IReadOnlyList<Tour>> GetToursAsync()
    {
        return await context.Tours.ToListAsync();
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public bool TourExists(int id)
    {
        return context.Tours.Any(t => t.Id == id);
    }

    public void UpdateTour(Tour tour)
    {
        context.Entry(tour).State = EntityState.Modified;
    }
}
