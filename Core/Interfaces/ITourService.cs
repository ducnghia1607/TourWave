using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore.Storage;

namespace Core.Interfaces
{
    public interface ITourService
    {
        Task<string> GenerateNewTourCode();
       Task<bool> CheckAlreadyReview(int tourId, int userId);
       Task TourWTToRemove(int tourId);
        IDbContextTransaction GetTransaction();
         void DeleteImageForEntity(Tour tour);
    }
}
