
using Core.Entities;

namespace Core.Interfaces;

public interface ITourRepository
{
    Task<IReadOnlyList<Tour>> GetToursAsync();
    Task<Tour?> GetTourByIdAsync(int id);
    void AddTour(Tour tour);
    void UpdateTour(Tour tour);
    void DeleteTour(Tour tour);
    bool TourExists(int id);
    Task<bool> SaveChangesAsync();
}
